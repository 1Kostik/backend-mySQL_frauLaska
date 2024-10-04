const pool = require("../../db");

const createCategories = async (req, res, next) => {
  const { title } = req.body;

  try {
    await pool.execute("INSERT INTO categories (title) VALUES (?)", [title]);

    const [categories] = await pool.execute("SELECT * FROM categories");

    res.status(201).json(categories);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createCategories;
