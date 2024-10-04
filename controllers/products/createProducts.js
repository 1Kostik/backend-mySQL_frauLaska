const pool = require("../../db");
const multer = require("multer");
const cloudinary = require("../../cloudinaryConfig");
const { getProduct } = require("./getProduct");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const saveTableProduct = async (data) => {
  const {
    category_id,
    title,
    description,
    main_image,
    benefit,
    popularity,
    product_code,
    composition,
  } = data;

  const columns = [];
  const values = [];
  const placeholders = [];

  if (category_id) {
    columns.push("category_id");
    values.push(category_id);
    placeholders.push("?");
  }
  if (title) {
    columns.push("title");
    values.push(title);
    placeholders.push("?");
  }
  if (description) {
    columns.push("description");
    values.push(description);
    placeholders.push("?");
  }
  if (main_image) {
    columns.push("main_image");
    values.push(main_image);
    placeholders.push("?");
  }
  if (benefit) {
    columns.push("benefit");
    values.push(benefit);
    placeholders.push("?");
  }
  if (popularity) {
    columns.push("popularity");
    values.push(popularity);
    placeholders.push("?");
  }
  if (product_code) {
    columns.push("product_code");
    values.push(product_code);
    placeholders.push("?");
  }
  if (composition) {
    columns.push("composition");
    values.push(composition);
    placeholders.push("?");
  }

  const sql = `INSERT INTO products (${columns.join(
    ", "
  )}) VALUES (${placeholders.join(", ")})`;

  const [result] = await pool.query(sql, values);
  return result.insertId;
};

const saveTableData = async (table, data, columns, mapFunc) => {
  if (!Array.isArray(data) || data.length === 0) {
    return `No ${table} to insert`;
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) => value !== undefined && value !== null && value !== ""
    )
  );

  if (filteredData.length === 0) {
    return `No ${table} to insert after filtering empty fields`;
  }

  const values = filteredData.map(mapFunc);
  const sql = `INSERT INTO ${table} (product_id, ${columns.join(
    ", "
  )}) VALUES ?`;

  await pool.query(sql, [values]);
};

const uploadImageToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const uniqueFileName = `${file.originalname}`;
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: uniqueFileName.split(".")[0],
      },
      (error, result) => {
        if (error) {
          reject(`Ошибка загрузки изображения: ${error.message}`);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    stream.end(file.buffer);
  });
};

const createProducts = async (req, res, next) => {
  const {
    category_id,
    title,
    description,
    benefit,
    main_image,
    popularity,
    product_code,
    composition,
    variations,
    feedbacks,
  } = req.body;

  const imageFiles = req.files;

  try {
    const folder = `products`;
    const uploadPromises = imageFiles.map((file) =>
      uploadImageToCloudinary(file, folder)
    );

    const imageUrls = await Promise.all(uploadPromises);

    const mainImageLink = imageUrls.find((link) => link.includes(main_image));

    const productData = {
      category_id,
      title,
      description,
      main_image: mainImageLink,
      benefit,
      popularity: popularity === "" ? undefined : popularity,
      product_code,
      composition,
    };

    const product_id = await saveTableProduct(productData);

    await saveTableData("imageUrls", imageUrls, ["img_url"], (url) => [
      product_id,
      url,
    ]);
    await saveTableData(
      "variations",
      variations,
      ["price", "discount", "count", "color", "size"],
      (item) => [
        product_id,
        item.price,
        item.discount === "" ? null : item.discount,
        item.count === "" ? undefined : item.count,
        item.color === "" ? null : item.color,
        item.size === "" ? null : item.size,
      ]
    );
    await saveTableData(
      "feedbacks",
      feedbacks,
      ["name", "profession", "review"],
      (item) => [product_id, item.name, item.profession, item.review]
    );
    const newProduct = await getProduct(product_id);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Ошибка при добавлении данных:", error);
    res.status(500).send("Ошибка при добавлении данных");
  }
};

module.exports = {
  createProducts,
  upload,
  saveTableData,
  uploadImageToCloudinary,
};
