const db = require("../../db");
const getOrderById = require("./getOrdersById");

const updateOrderStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE orders SET status = ? WHERE id = ?`;
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        console.error("Error updating order status:", err);
        return reject(new Error("Ошибка обновления статуса заказа"));
      }
      resolve(result);
    });
  });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send("Статус обязателен для обновления");
  }

  try {
    const result = await updateOrderStatus(id, status);
    if (result.affectedRows === 0) {
      return res.status(404).send("Заказ не найден");
    }

    // Получаем обновленный заказ
    const updatedOrder = await getOrderById(id);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Ошибка при обновлении заказа:", error);
    res.status(500).send("Ошибка при обновлении заказа");
  }
};

module.exports = { updateOrder, updateOrderStatus };
