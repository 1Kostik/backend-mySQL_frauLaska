const db = require("../../db");

const createCategories = async (req, res, next) => {
  const { title } = req.body;
  const insertSql = `INSERT INTO categories (title) VALUES(?)`;
  const selectSql = `SELECT * FROM categories`;

  try {
    await executeQuery(insertSql, [title]);

    const categories = await executeQuery(selectSql);

    res.status(201).json(categories);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

const executeQuery = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = createCategories;
