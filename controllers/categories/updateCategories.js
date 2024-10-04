const pool = require("../../db");

const updateCategories = async (req, res, next) => {
  const { title } = req.body;
  const { id } = req.params;

  try {
    await pool.execute("UPDATE categories SET title = ? WHERE id = ?", [
      title,
      id,
    ]);

    const [categories] = await pool.execute("SELECT * FROM categories");

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateCategories;
