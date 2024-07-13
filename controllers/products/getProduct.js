const db = require("../../db");

const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await fetchProduct(id);
    const images = await getImages(id);
    const volumes = await getVolumes(id);
    const colors = await getColors(id);

    res.json({
      status: "success",
      code: 200,
      data: {
        productData: {
          ...product[0],
          imageUrls: images,
          volumes,
          colors,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const fetchProduct = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM products WHERE id = ?`;
    db.query(sql, [id], (err, data) => {
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
module.exports = getProduct;
