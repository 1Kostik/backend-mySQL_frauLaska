const db = require("../../db");
const getAllProducts = require("./getAllProducts");
const multer = require("multer");
const cloudinary = require("../../cloudinaryConfig");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const saveTableProduct = async (data) => {
  const {
    category_id,
    title,
    description,
    discount,
    stockCount,
    ranking,
    benefit,
    popularity,
    productCode,
    composition,
  } = data;
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO products (category_id, title, description, discount, stockCount, ranking, benefit, popularity, productCode, composition)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        category_id,
        title,
        description,
        discount,
        stockCount,
        ranking,
        benefit,
        popularity,
        productCode,
        composition,
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
    discount,
    stockCount,
    ranking,
    benefit,
    popularity,
    productCode,
    composition,
    volumes,
    colors,
  } = req.body;

  const productData = {
    category_id,
    title,
    description,
    discount,
    stockCount,
    ranking,
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
    await saveTableData("colors", product_id, colors, ["color"], (color) => [
      product_id,
      color,
    ]);
    await saveTableData(
      "volumes",
      product_id,
      volumes,
      ["size", "price"],
      (item) => [product_id, item.size, item.price]
    );

    const allProducts = await getAllProducts();

    res.status(201).json({
      status: "success",
      code: 201,
      data: { productData: allProducts },
    });
  } catch (error) {
    console.error("Помилка при додаванні даних:", error);
    res.status(500).send("Помилка при додаванні даних");
  }
};

module.exports = { createProducts, upload };
