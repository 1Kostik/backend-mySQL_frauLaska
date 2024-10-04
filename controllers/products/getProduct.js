const pool = require("../../db");

const getProduct = async (id) => {
  try {
    const product = await fetchProduct(id);
    if (product.length === 0) {
      throw new Error("Product not found");
    }

    const images = await getImages(id);
    const variations = await getVariations(id);
    const feedbacks = await getFeedbacks(id);

    const productData = {
      ...product[0],
      imageUrls: [
        ...images.filter((item) =>
          item.img_url.includes(product[0].main_image)
        ),
        ...images.filter(
          (item) => !item.img_url.includes(product[0].main_image)
        ),
      ],
      variations,
      feedbacks,
    };

    return productData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchProduct = async (id) => {
  const sql = `SELECT * FROM products WHERE id = ?`;
  const [data] = await pool.query(sql, [id]);
  return data;
};

const getImages = async (product_id) => {
  const sql = `SELECT img_url, id FROM imageUrls WHERE product_id = ?`;
  const [data] = await pool.query(sql, [product_id]);
  return data;
};

const getMainImage = async (product_id) => {
  const sql = `SELECT main_image FROM products WHERE id = ?`;
  const [[data]] = await pool.query(sql, [product_id]);
  return data.main_image;
};

const getVariations = async (product_id) => {
  const sql = `SELECT id, price, discount, count, color, size FROM variations WHERE product_id = ?`;
  const [data] = await pool.query(sql, [product_id]);
  return data;
};

const getFeedbacks = async (product_id) => {
  const sql = `SELECT id, name, profession, review FROM feedbacks WHERE product_id = ?`;
  const [data] = await pool.query(sql, [product_id]);
  return data;
};

module.exports = { getProduct, getMainImage, getImages };
