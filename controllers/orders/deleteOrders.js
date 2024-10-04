const pool = require("../../db");

const deleteOrderItemsByOrderNumber = async (orders_items_id) => {
  try {
    await pool.execute('DELETE FROM order_items WHERE orders_items_id = ?', [orders_items_id]);
    return true; 
  } catch (error) {
    throw error;
  }
};

const deleteOrderByNumber = async (id) => {
  try {
    const [result] = await pool.execute('DELETE FROM orders WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteOrderItemsByOrderNumber(id);

    const isDeleted = await deleteOrderByNumber(id);
    if (!isDeleted) {
      return res.status(404).send("Заказ не найден");
    }
    res.status(200).send("Заказ успешно удален");
  } catch (error) {
    console.error("Ошибка при удалении заказа:", error);
    res.status(500).send("Ошибка при удалении заказа");
  }
};

module.exports = deleteOrder;