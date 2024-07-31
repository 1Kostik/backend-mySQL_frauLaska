const db = require("../../db");
const fetchOrderWithItemsByNumber = (order_number) => {
  return new Promise((resolve, reject) => {
    const sql = `
        SELECT o.*, oi.* 
        FROM orders o
        LEFT JOIN order_items oi ON o.order_number = oi.number_order
        WHERE o.order_number = ?`;

    db.query(sql, [order_number], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getOrderByNumber = async (order_number) => {
  try {
    const result = await fetchOrderWithItemsByNumber(order_number);
    return result;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error(
      "Виникла проблема з сервером. Будь ласка, спробуйте пізніше."
    );
  }
};

module.exports = getOrderByNumber;
