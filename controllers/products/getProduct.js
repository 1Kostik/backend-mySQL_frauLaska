const db = require("../../db");

const getProduct = async (id) => {
  try {
    // Получаем основной продукт
    const product = await fetchProduct(id);
    if (product.length === 0) {
      throw new Error("Product not found");
    }

    // Получаем изображения, вариации и отзывы
    const images = await getImages(id);
    const variations = await getVariations(id);
    const feedbacks = await getFeedbacks(id);

    // Формируем полный объект данных
    const productData = {
      ...product[0],
      imageUrls: images,
      variations,
      feedbacks,
    };

    return productData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchProduct = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM products WHERE id = ?`;
    db.query(sql, [id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getImages = (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT img_url, id FROM imageUrls WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getVariations = (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, price, discount, count, color, size FROM variations WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getFeedbacks = (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name, profession, review FROM feedbacks WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
module.exports = getProduct;
