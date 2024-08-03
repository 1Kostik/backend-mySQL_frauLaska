const db = require("../../db");
const fetchOrderWithItemsByNumber = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
        SELECT o.*, oi.* 
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.orders_items_id
        WHERE o.id = ?`;

    db.query(sql, [id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getOrderByNumber = async (id) => {
  try {
    const result = await fetchOrderWithItemsByNumber(id);
    return result;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error(
      "Виникла проблема з сервером. Будь ласка, спробуйте пізніше."
    );
  }
};

module.exports = getOrderByNumber;
