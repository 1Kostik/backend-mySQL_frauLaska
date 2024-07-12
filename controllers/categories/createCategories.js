const db = require('../../db');

const createCategories = async (req, res, next) => {
  const { title } = req.body;
  const insertSql = `INSERT INTO categories (title) VALUES(?)`;
  const selectSql = `SELECT * FROM categories`;

  try {
    await executeQuery(insertSql, [title]); 

    const categories = await executeQuery(selectSql);

    res.status(201).json({
      status: "success",
      code: 201,
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

module.exports = createCategories;


// const db = require('../../db');

// const createCategories = async (req, res, next) => {
//   const { title } = req.body;
//   const sql = `INSERT INTO categories (title) VALUES(?)`;

//   db.query(sql, [title], (err, data) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json(err);
//     }
//     return res.status(201).json({
//       status: "success",
//       code: 200,
//       data: { 
//         data
//        },
//     });
//   });
// };
// module.exports = createCategories;
