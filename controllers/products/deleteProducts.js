const pool = require("../../db");
const cloudinary = require("../../cloudinaryConfig");
const { getAllProducts } = require("./getAllProducts");

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVariations(id);
    await deleteFeedbacks(id);
    const imageUrls = await deleteImageUrls(id);
    await deleteProduct(id);

    await Promise.all(
      imageUrls.map((url) => {
        const startIndex = url.indexOf("products");
        const public_id = url.slice(startIndex).split(".")[0];
        return cloudinary.uploader.destroy(public_id);
      })
    );

    const productData = await getAllProducts();
    res.status(200).json(productData);
  } catch (error) {
    console.error("Error in /deleteProductData:", error);
    res.status(500).send("Error deleting product data");
  }
};

const deleteProduct = async (id) => {
  const query = "DELETE FROM products WHERE id = ?";
  await pool.query(query, [id]);
};

const deleteVariations = async (product_id) => {
  const query = "DELETE FROM variations WHERE product_id = ?";
  await pool.query(query, [product_id]);
};

const deleteFeedbacks = async (product_id) => {
  const query = "DELETE FROM feedbacks WHERE product_id = ?";
  await pool.query(query, [product_id]);
};

const deleteImageUrls = async (product_id) => {
  const query = "SELECT img_url FROM imageUrls WHERE product_id = ?";
  const [rows] = await pool.query(query, [product_id]);

  const deleteQuery = "DELETE FROM imageUrls WHERE product_id = ?";
  await pool.query(deleteQuery, [product_id]);

  return rows.map((row) => row.img_url);
};

module.exports = deleteProducts;
