const pool = require("../../db");

const getCategoriesProductCount = async (req, res) => {
  try {
    const query = `
     SELECT
     c.id,
     c.title,
     COUNT(DISTINCT p.id) AS product_count,
     JSON_ARRAYAGG(
     JSON_OBJECT(
      "product_id", p.id,
      "product_title", p.title,
      "product_quantity", v.max_count,
      "categoryId", c.id
     )
     ) AS products
     FROM categories c
     LEFT JOIN products p ON c.id = p.category_id
     LEFT JOIN (
     SELECT product_id, MAX(count) AS max_count
     FROM variations
     GROUP BY product_id
     ) v ON p.id = v.product_id
     GROUP BY c.id, c.title;
    `;

    const [results] = await pool.execute(query);

    res.json(results);
  } catch (error) {
    console.error("Error fetching categories with product count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getCategoriesProductCount;
