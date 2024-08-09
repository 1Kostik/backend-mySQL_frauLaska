const db = require("../../db");

const deleteOrderItemsByOrderNumber = (orders_items_id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM order_items WHERE orders_items_id = ?`;
    db.query(sql, [orders_items_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deleteOrderByNumber = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM orders WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteOrderItemsByOrderNumber(id);

    const result = await deleteOrderByNumber(id);
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
