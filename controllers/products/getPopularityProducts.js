const pool = require("../../db");

const getPopularityProducts = async (req, res) => {
  try {
    const [products] = await pool.execute(`
      SELECT 
        p.id, 
        p.title, 
        p.popularity, 
        MIN(i.img_url) AS image_url, 
        MIN(v.price) AS price
      FROM products p
      LEFT JOIN imageUrls i ON p.id = i.product_id
      LEFT JOIN variations v ON p.id = v.product_id
      GROUP BY p.id
      ORDER BY p.popularity DESC
      LIMIT 10;
    `);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving popular products:", error);
    res.status(500).json({ message: "Error retrieving popular products" });
  }
};

module.exports = getPopularityProducts;