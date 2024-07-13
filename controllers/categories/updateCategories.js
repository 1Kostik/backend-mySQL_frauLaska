const db = require("../../db");

const updateCategories = async (req, res, next) => {
  const {  title } = req.body;
  const {id}=req.params;
  const updateSql = `UPDATE categories SET title = ? WHERE id = ?`;
  const selectSql = `SELECT * FROM categories`;

  try {
    await executeQuery(updateSql, [title, id]);

    const categories = await executeQuery(selectSql);

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        categories: categories,
      },
    });
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

module.exports = updateCategories;
