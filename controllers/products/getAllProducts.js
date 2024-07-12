const db = require('../../db');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await getProducts();
    const productDataPromises = await products.map(async (product) => {
      const images = await getImages(product.id);
      const volumes = await getVolumes(product.id);
      const colors = await getColors(product.id);
      return {
        ...product,
        imageUrls: images,
        volumes: volumes,
        colors: colors,
      };
    });
    const productData = await Promise.all(productDataPromises);
    res.json({
      status: "success",
      code: 200,
      data: {
        productData,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

 
};
module.exports = getAllProducts;


const getProducts = async () => {
  return new Promise((res, rej) => {
    const sql = `SELECT * FROM products`;
    db.query(sql, (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
};
const getImages = async (product_id) => {
  return new Promise((res, rej) => {
    const sql = `SELECT * FROM imageUrls WHERE product_id=?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return rej.json(err);
      res(data);
    });
  });
};
const getVolumes = async (product_id) => {
  return new Promise((res, rej) => {
    const sql = `SELECT * FROM volumes WHERE product_id=?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
};
const getColors = async (product_id) => {
  return new Promise((res, rej) => {
    const sql = `SELECT * FROM colors WHERE product_id=?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return rej(err);
      res(data);
    });
  });
};