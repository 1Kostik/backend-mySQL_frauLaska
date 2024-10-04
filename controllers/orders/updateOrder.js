const pool = require("../../db");
const getOrderById = require("./getOrdersById");

const updateOrderStatus = async (id, status) => {
  try {
    await pool.execute("UPDATE orders SET status = ? WHERE id = ?", [
      status,
      id,
    ]);
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Помилка оновлення статусу замовлення");
  }
};

const updatePaymentStatus = async (id, status) => {
  try {
    await pool.execute("UPDATE orders SET payment_status = ? WHERE id = ?", [
      status,
      id,
    ]);
    return true;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw new Error("Помилка оновлення статусу оплати");
  }
};

const updatePaymentInfo = async (id, paymentInfo) => {
  try {
    await pool.execute("UPDATE orders SET payment_info = ? WHERE id = ?", [
      JSON.stringify(paymentInfo),
      id,
    ]);
    return true;
  } catch (error) {
    console.error("Error updating payment info:", error);
    throw new Error("Помилка оновлення інформації про платіж");
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, paymentInfo } = req.body;

  try {
    if (status) {
      await updateOrderStatus(id, status);
    }
    if (paymentInfo) {
      await updatePaymentInfo(id, paymentInfo);
    }

    const updatedOrder = await getOrderById(id);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Помилка при оновленні замовлення:", error);
    res.status(500).send("Помилка при оновленні замовлення");
  }
};

module.exports = {
  updateOrder,
  updateOrderStatus,
  updatePaymentStatus,
  updatePaymentInfo,
};
