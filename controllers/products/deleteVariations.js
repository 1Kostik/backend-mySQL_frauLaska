const pool = require("../../db");

const deleteVariations = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVariation(id);
    res
      .status(200)
      .json({ message: `Variations with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting variations data:", error);
    res.status(500).send("Error deleting variations data");
  }
};

const deleteVariation = async (id) => {
  const query = "DELETE FROM variations WHERE id = ?";
  await pool.query(query, [id]);
};

module.exports = deleteVariations;
