const db = require("../../db");
const getOrderById = require("./getOrdersById");

const updateOrderStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE orders SET status = ? WHERE id = ?`;
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        console.error("Error updating order status:", err);
        return reject(new Error("Помилка оновлення статусу замовлення"));
      }
      resolve(result);
    });
  });
};

const updatePaymentStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE orders SET payment_status = ? WHERE id = ?`;
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        console.error("Error updating order status:", err);
        return reject(new Error("Помилка оновлення статусу замовлення"));
      }
      resolve(result);
    });
  });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).send("Статус є обов'язковим для оновлення");
  }

  try {
    const result = await updateOrderStatus(id, status);
    if (result.affectedRows === 0) {
      return res.status(404).send("Замовлення не знайдено");
    }

    // Получаем обновленный заказ
    const updatedOrder = await getOrderById(id);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Помилка при оновленні замовлення:", error);
    res.status(500).send("Помилка при оновленні замовлення");
  }
};

const updatePaymentInfo = (id, paymentInfo) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE orders SET payment_info = ? WHERE id = ?`;
    console.log("id", id);
    // console.log('paymentInfo', paymentInfo)
    db.query(sql, [JSON.stringify(paymentInfo), id], (err, result) => {
      if (err) {
        console.error("Error updating payment info:", err);
        return reject(new Error("Помилка оновлення інформації про платіж"));
      }
      resolve(result);
    });
  });
};

module.exports = {
  updateOrder,
  updateOrderStatus,
  updatePaymentStatus,
  updatePaymentInfo,
};
