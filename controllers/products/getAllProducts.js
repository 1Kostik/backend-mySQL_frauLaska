const db = require("../../db");

const getAllProducts = async () => {
  try {
    const products = await getProducts();
    const productDataPromises = products.map(async (product) => {
      const images = await getImages(product.id);
      const variations = await getVariations(product.id);
      const feedbacks = await getFeedbacks(product.id);
      return {
        ...product,
        imageUrls: images.map(item => item),
        variations: variations.map(item => item),
        feedbacks: feedbacks.map(item => item),
      };
    });
    const productData = await Promise.all(productDataPromises);
    return productData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProducts = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM products`;
    db.query(sql, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getImages = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT img_url,id FROM imageUrls WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getVariations = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, price,discount,count,color,size FROM variations WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getFeedbacks = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id,name,profession,review FROM feedbacks WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports = {getAllProducts,getVariations,getFeedbacks,getImages};
