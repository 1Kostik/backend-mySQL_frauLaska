const db = require("../../db");
const fetchOrderWithItemsByNumber = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
        SELECT * FROM orders WHERE id = ?`;

    db.query(sql, [id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
const fetchOrderItemsById = (orders_items_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM order_items WHERE orders_items_id = ? `;
    db.query(sql, [orders_items_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};
const getOrderById = async (id) => {
  try {
    let order_items;

    const result = await fetchOrderWithItemsByNumber(id);

    if (result && id) {
      order_items = await fetchOrderItemsById(id);
    }

    const resultOrders = {
      ...result[0],
      order_items,
    };

    return resultOrders;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error(
      "Виникла проблема з сервером. Будь ласка, спробуйте пізніше."
    );
  }
};

module.exports = getOrderById;
