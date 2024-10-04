const pool = require("../../db");

const fetchOrderWithItemsByNumber = async (id) => {
  const sql = `SELECT * FROM orders WHERE id = ?`;
  const [data] = await pool.execute(sql, [id]);
  return data;
};

const fetchOrderItemsById = async (orders_items_id) => {
  const sql = `SELECT * FROM order_items WHERE orders_items_id = ?`;
  const [data] = await pool.execute(sql, [orders_items_id]);
  return data;
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
