const db = require("../../db");
const { getAllProducts } = require("./getAllProducts");

const deleteVariations = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVariation(id);

    const allProducts = await getAllProducts();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).send("Error deleting variations data");
  }
};

const deleteVariation = async (id) => {
  const query = "DELETE FROM variations WHERE id = ?";
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

module.exports = deleteVariations;
