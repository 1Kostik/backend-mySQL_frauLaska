const pool = require("../../db");

const fetchAllOrders = async (limit, page, sortOrder) => {
  const offset = (page - 1) * limit;
  const orderToSort = ["ASC", "DESC"].includes(sortOrder?.toUpperCase())
    ? sortOrder.toUpperCase()
    : "ASC";

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
      o.delivery_city,
      o.delivery_destination,
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
    ORDER BY 
      o.order_date ${orderToSort}
  LIMIT ${pool.escape(limit)} OFFSET ${pool.escape(offset)};
  `;

  const queryParams = [limit, offset];

  try {
    const [data] = await pool.execute(sql, queryParams);

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
        delivery_city,
        delivery_destination,
        recipient_name,
        recipient_last_name,
        recipient_phone,
        order_item_db_id,
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
          delivery_city,
          delivery_destination,
          recipient_name,
          recipient_last_name,
          recipient_phone,
          order_items: [],
        };
      }

      if (order_item_db_id) {
        acc[order_id].order_items.push({
          id: order_item_db_id,
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

    const sortedOrders = Object.values(orders);

    sortedOrders.sort((a, b) => {
      const dateA = new Date(a.order_date);
      const dateB = new Date(b.order_date);
      return orderToSort === "ASC" ? dateA - dateB : dateB - dateA;
    });

    return sortedOrders;
  } catch (err) {
    throw new Error(`Ошибка при выполнении запроса: ${err.message}`);
  }
};

const fetchOrders = async () => {
  const sql = `
    SELECT 
      *
    FROM 
      orders o
    LEFT JOIN 
      order_items oi ON o.id = oi.orders_items_id
  `;

  try {
    const [data] = await pool.execute(sql);
    return data;
  } catch (err) {
    throw new Error(`Ошибка при выполнении запроса: ${err.message}`);
  }
};

const getAllOrders = async (req, res) => {
  const limit = 20;
  try {
    const { page = 1, sortOrder = "ASC" } = req.query;

    const orders = await fetchAllOrders(
      parseInt(limit),
      parseInt(page),
      sortOrder
    );
    const orderItems = await fetchOrders();
    const totalOrders = orderItems.length;

    res.status(200).json({ data: orders, totalOrders });
  } catch (error) {
    console.error("Ошибка при получении всех заказов:", error);
    res.status(500).send("Ошибка при получении всех заказов");
  }
};

module.exports = {
  getAllOrders,
};
