const db = require("../../db");

const fetchAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        o.id AS order_id,       
        o.status, 
        o.paymentMethod, 
        o.deliveryType, 
        o.total_amount, 
        o.order_date, 
        o.name, 
        o.lastName, 
        o.email, 
        o.phone,
        o.postOfficeNumber,
        o.recipientName,
        o.recipientLastName,
        o.recipientPhone,
        oi.id AS order_item_db_id,
        oi.product_id, 
        oi.title,
        oi.count, 
        oi.totalCost,
        oi.color,
        oi.size,
        oi.productCode
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
          paymentMethod,
          deliveryType,
          total_amount,
          order_date,
          name,
          lastName,
          email,
          phone,
          postOfficeNumber,
          recipientName,
          recipientLastName,
          recipientPhone,
          order_item_db_id, // ID элемента заказа
          product_id,
          title,
          count,
          totalCost,
          color,
          size,
          productCode,
        } = row;

        if (!acc[order_id]) {
          acc[order_id] = {
            id: order_id,
            status,
            paymentMethod,
            deliveryType,
            total_amount,
            order_date,
            name,
            lastName,
            email,
            phone,
            postOfficeNumber,
            recipientName,
            recipientLastName,
            recipientPhone,
            order_items: [],
          };
        }

        if (order_item_db_id) {
          acc[order_id].order_items.push({
            id: order_item_db_id, // Сохраняем id из таблицы order_items
            product_id,
            title,
            count,
            totalCost,
            color,
            size,
            productCode,
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
