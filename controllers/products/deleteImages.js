const pool = require("../../db");
const cloudinary = require("../../cloudinaryConfig");
const { getAllProducts } = require("./getAllProducts");

const deleteImages = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteImageUrls(id);  
    res.status(204).json();
  } catch (error) {
    console.error("Error in /deleteProductData:", error);
    res.status(500).send("Error deleting product data");
  }
};

const deleteImageUrls = async (id) => {
  const query = "SELECT img_url FROM imageUrls WHERE id = ?";
  const [rows] = await pool.query(query, [id]);

  const deletePromises = rows.map(async (row) => {
    const startIndex = row.img_url.indexOf("products");
    const public_id = row.img_url.slice(startIndex).split(".")[0];
    await cloudinary.uploader.destroy(public_id);
  });

  await Promise.all(deletePromises);

  const deleteQuery = "DELETE FROM imageUrls WHERE id = ?";

  const [result] = await pool.query(deleteQuery, [Number(id)]);

  return result;
};

module.exports = deleteImages;
