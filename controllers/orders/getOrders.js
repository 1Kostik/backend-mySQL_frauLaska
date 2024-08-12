const db = require("../../db");

const fetchAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        o.id AS order_id,       
        o.status, 
        o.payment_status,
        o.payment_method, 
        o.delivery_type, 
        o.total_amount, 
        o.order_date, 
        o.name, 
        o.last_name, 
        o.email, 
        o.phone,
        o.post_office_number,
        o.recipient_name,
        o.recipient_last_name,
        o.recipient_phone,
        oi.id AS order_item_db_id,
        oi.product_id, 
        oi.title,
        oi.count, 
        oi.total_cost,
        oi.color,
        oi.size,
        oi.product_code
      FROM 
        orders o
      LEFT JOIN 
        order_items oi ON o.id = oi.orders_items_id
    `;
    db.query(sql, (err, data) => {
      if (err) return reject(err);

      // Группировка товаров по заказам
      const orders = data.reduce((acc, row) => {
        const {
          order_id,
          status,
          payment_status,
          payment_method,
          delivery_type,
          total_amount,
          order_date,
          name,
          last_name,
          email,
          phone,
          post_office_number,
          recipient_name,
          recipient_last_name,
          recipient_phone,
          order_item_db_id, // ID элемента заказа
          product_id,
          title,
          count,
          total_cost,
          color,
          size,
          product_code,
        } = row;

        if (!acc[order_id]) {
          acc[order_id] = {
            id: order_id,
            status,
            payment_status,
            payment_method,
            delivery_type,
            total_amount,
            order_date,
            name,
            last_name,
            email,
            phone,
            post_office_number,
            recipient_name,
            recipient_last_name,
            recipient_phone,
            order_items: [],
          };
        }

        if (order_item_db_id) {
          acc[order_id].order_items.push({
            id: order_item_db_id, // Сохраняем id из таблицы order_items
            product_id,
            title,
            count,
            total_cost,
            color,
            size,
            product_code,
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
  getAllOrders,
};
