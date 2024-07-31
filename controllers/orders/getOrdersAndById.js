const db = require("../../db");

const fetchOrderByNumber = (order_number) => {
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
const getOrderByNumber = async (req, res) => {
  const order_number = req.params.order_number;

  try {
    const order = await fetchOrderByNumber(order_number);
    if (order.length === 0) {
      return res.status(404).send("Заказ не найден");
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Ошибка при получении заказа:", error);
    res.status(500).send("Ошибка при получении заказа");
  }
};

const fetchAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        o.order_id, 
        o.order_number, 
        o.status, 
        o.payment_method, 
        o.delivery_method, 
        o.total_amount, 
        o.order_date, 
        o.user_name, 
        o.user_lastname, 
        o.user_email, 
        o.user_phoneNumber,
        oi.order_item_id,
        oi.number_order,
        oi.product_id, 
        oi.product_name, 
        oi.quantity, 
        oi.price,
        oi.color,
        oi.size
      FROM 
        orders o
      LEFT JOIN 
        order_items oi ON o.order_number = oi.number_order
    `;
    db.query(sql, (err, data) => {
      if (err) return reject(err);

      // Grouping order items by order
      const orders = data.reduce((acc, row) => {
        const {
          order_id,
          order_number,
          status,
          payment_method,
          delivery_method,
          total_amount,
          order_date,
          user_name,
          user_lastname,
          user_email,
          user_phoneNumber,
          order_item_id,
          number_order,
          product_id,
          product_name,
          quantity,
          price,
          color,
          size,
        } = row;

        if (!acc[order_number]) {
          acc[order_number] = {
            order_id,
            order_number,
            status,
            payment_method,
            delivery_method,
            total_amount,
            order_date,
            user_name,
            user_lastname,
            user_email,
            user_phoneNumber,
            order_items: [],
          };
        }

        if (order_item_id) {
          acc[order_number].order_items.push({
            order_item_id,
            number_order,
            product_id,
            product_name,
            quantity,
            price,
            color,
            size,
          });
        }

        return acc;
      }, {});

      resolve(Object.values(orders));
    });
  });
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await fetchAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Ошибка при получении всех заказов:", error);
    res.status(500).send("Ошибка при получении всех заказов");
  }
};

module.exports = {
  getOrderByNumber,
  getAllOrders,
};
