const db = require("../../db");


const deleteVariations = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVariation(id);
    res.status(204)
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
