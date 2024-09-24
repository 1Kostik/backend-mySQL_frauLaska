const db = require("../../db");

const getPopularityProducts = (req, res) => {
  const sql = `
    SELECT p.id, p.title, p.popularity, 
           (SELECT MIN(i.img_url) 
            FROM imageUrls i 
            WHERE i.product_id = p.id) AS image_url,
           (SELECT MIN(v.price) 
            FROM variations v 
            WHERE v.product_id = p.id) AS price
    FROM products p
    ORDER BY p.popularity DESC
  `;

  db.query(sql, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving popular products", error: err });
    }
    res.status(200).json(data.slice(0, 10));
  });
};

module.exports = getPopularityProducts;
