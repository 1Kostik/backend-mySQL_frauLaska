const db = require("../../db");
const { getAllProducts } = require("./getAllProducts");
const multer = require("multer");
const cloudinary = require("../../cloudinaryConfig");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const saveTableProduct = async (data) => {
  const {
    category_id,
    title,
    description,
    ranking,
    mainImage,
    benefit,
    popularity,
    productCode,
    composition,
  } = data;
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO products (category_id, title, description, ranking, benefit, popularity, productCode, composition, mainImage)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        category_id,
        title,
        description,
        ranking,
        benefit,
        popularity,
        productCode,
        composition,
        mainImage,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        const product_id = result.insertId;
        resolve(product_id);
      }
    );
  });
};

const saveTableData = async (table, product_id, data, columns, mapFunc) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(data) || data.length === 0) {
      return resolve(`No ${table} to insert`);
    }
    const values = data.map(mapFunc);
    const sql = `INSERT INTO ${table} (product_id, ${columns.join(
      ", "
    )}) VALUES ?`;
    db.query(sql, [values], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const uploadImageToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
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
    ranking,
    benefit,
    mainImage,
    popularity,
    productCode,
    composition,
    variations,
    feedbacks,
  } = req.body;

  const productData = {
    category_id,
    title,
    description,
    ranking,
    mainImage,
    benefit,
    popularity,
    productCode,
    composition,
  };

  const imageFiles = req.files;

  try {
    const product_id = await saveTableProduct(productData);

    const folder = `products`;

    const uploadPromises = imageFiles.map((file) =>
      uploadImageToCloudinary(file, folder)
    );
    const imageUrls = await Promise.all(uploadPromises);

    await saveTableData(
      "imageUrls",
      product_id,
      imageUrls,
      ["img_url"],
      (url) => [product_id, url]
    );
    await saveTableData(
      "variations",
      product_id,
      variations,
      ["price", "discount", "count", "color", "size"],
      (item) => [
        product_id,
        item.price,
        item.discount,
        item.count,
        item.color,
        item.size,
      ]
    );
    await saveTableData(
      "feedbacks",
      product_id,
      feedbacks,
      ["name", "profession", "review"],
      (item) => [product_id, item.name, item.profession, item.review]
    );

    const newProductData = await getAllProducts();

    res.status(201).json(newProductData);
  } catch (error) {
    console.error("Помилка при додаванні даних:", error);
    res.status(500).send("Помилка при додаванні даних");
  }
};

module.exports = {
  createProducts,
  upload,
  saveTableData,
  uploadImageToCloudinary,
};
