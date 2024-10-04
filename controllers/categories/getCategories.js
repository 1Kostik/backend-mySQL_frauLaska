const pool = require("../../db");

const getCategories = async (req, res, next) => {
  try {
    const [categories] = await pool.execute('SELECT * FROM categories');

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCategories;
