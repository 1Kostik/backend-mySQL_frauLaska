const db = require("../../db");

const getCategoriesProductCount = async (req, res) => {
  try {
    const query = `
          SELECT 
          c.id,
          c.title,
          COUNT(DISTINCT p.id)
          AS product_count,
          JSON_ARRAYAGG(JSON_OBJECT("product_id",
          p.id, "product_title",
          p.title,
          "product_quantity",
          v.count,
          "categoryId",
          c.id
          )) AS products
          FROM categories c
          LEFT JOIN products p ON c.id = p.category_id
          LEFT JOIN variations v ON p.id = v.product_id
          GROUP BY c.id, c.title;
        `;

    const results = await executeQuery(query);
 
    res.json(results);
  } catch (error) {
    console.error("Error fetching categories with product count:", error);
    res.status(500).json({ error: "Internal server error" });
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
module.exports = getCategoriesProductCount;
