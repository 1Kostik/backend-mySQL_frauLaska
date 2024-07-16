const db = require("../../db");
const getAllProducts = require("./getAllProducts");

const deleteColors = async (req, res) => {
  const { id } = req.params;

  try {
    await removeColors(id);

    const productData = await getAllProducts();

    res.status(200).json(productData);
  } catch (error) {
    console.error("Error in /deleteProductData:", error);
    res.status(500).send("Error deleting product data");
  }
};

const removeColors = async (id) => {
  const query = "DELETE FROM colors WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error deleting imageUrls:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = deleteColors;
