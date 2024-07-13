const db = require("../../db");

const getAllProducts = async () => {
  try {
    const products = await getProducts();
    const productDataPromises = products.map(async (product) => {
      const images = await getImages(product.id);
      const volumes = await getVolumes(product.id);
      const colors = await getColors(product.id);
      return {
        ...product,
        imageUrls: images.map(item => item),
        volumes: volumes,
        colors: colors.map(item => item),
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

const getVolumes = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT size, price,id FROM volumes WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getColors = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT color,id FROM colors WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports = getAllProducts;
