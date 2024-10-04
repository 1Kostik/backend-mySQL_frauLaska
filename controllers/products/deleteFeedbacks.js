const pool = require("../../db");

const deleteFeedbacks = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await removeFeedbacks(id);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Feedback with ID ${id} not found` });
    }
    res
      .status(200)
      .json({ message: `Feedback with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting feedbacks data:", error);
    res.status(500).send("Error deleting feedbacks data");
  }
};

const removeFeedbacks = async (id) => {
  const query = "DELETE FROM feedbacks WHERE id = ?";
  const [result] = await pool.query(query, [id]);
  return result;
};

module.exports = deleteFeedbacks;
