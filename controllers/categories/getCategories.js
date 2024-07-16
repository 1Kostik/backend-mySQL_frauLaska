const db = require("../../db");

const getCategories = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM categories`;

    const categories = await executeQuery(sql);

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

const executeQuery = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
module.exports = getCategories;
