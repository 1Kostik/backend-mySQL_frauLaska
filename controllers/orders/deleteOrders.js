const db = require("../../db");

const deleteOrderItemsByOrderNumber = (order_number) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM order_items WHERE number_order = ?`;
    db.query(sql, [order_number], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deleteOrderByNumber = (order_number) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM orders WHERE order_number = ?`;
    db.query(sql, [order_number], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deleteOrder = async (req, res) => {
  const { order_number } = req.params;
  try {
    await deleteOrderItemsByOrderNumber(order_number);

    const result = await deleteOrderByNumber(order_number);
    if (result.affectedRows === 0) {
      return res.status(404).send("Заказ не найден");
    }
    res.status(200).send("Заказ успешно удален");
  } catch (error) {
    console.error("Ошибка при удалении заказа:", error);
    res.status(500).send("Ошибка при удалении заказа");
  }
};

module.exports = deleteOrder;
