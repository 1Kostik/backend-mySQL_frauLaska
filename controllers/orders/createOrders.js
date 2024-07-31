const db = require("../../db");
const getOrderByNumber = require("./getOrders");

const saveTableDataOrders = async (
  tableName,
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
  columns,
  valueMapper
) => {
  const values = valueMapper({
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
  });

  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("Values must be a non-empty array");
  }

  const query = `INSERT INTO ${tableName} (${columns.join(
    ", "
  )}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  await db.query(query, values);
};

const saveTableDataOrderItems = async (tableName, data, columns, mapFunc) => {
    if (!Array.isArray(data) || data.length === 0) {
      return Promise.reject(`No ${tableName} to insert`);
    }
  
    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) => value !== undefined && value !== null && value !== ""
      )
    );
  
    if (filteredData.length === 0) {
      return Promise.reject(`No ${tableName} to insert after filtering empty fields`);
    }
  
    const values = filteredData.map(mapFunc);
  
    const query = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES ?`;
  
    // Используем db.query с массивом значений
    await db.query(query, [values]);
  };
  

const createOrders = async (req, res) => {
  const {
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
    order_items,
  } = req.body;

  try {
    await saveTableDataOrders(
      "orders",
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
      [
        "order_number",
        "status",
        "payment_method",
        "delivery_method",
        "total_amount",
        "order_date",
        "user_name",
        "user_lastname",
        "user_email",
        "user_phoneNumber",
      ],
      (item) => [
        item.order_number,
        item.status,
        item.payment_method,
        item.delivery_method,
        item.total_amount,
        item.order_date,
        item.user_name,
        item.user_lastname,
        item.user_email,
        item.user_phoneNumber,
      ]
    );
    await saveTableDataOrderItems(
      "order_items",
      order_items,
      [
        "number_order",
        "product_id",
        "product_name",
        "quantity",
        "price",
        "color",
        "size",
        "product_code",
      ],
      (item) => [
        item.number_order,
        item.product_id,
        item.product_name,
        item.quantity,
        item.price,
        item.color,
        item.size,
        item.product_code,
      ]
    );
    const result = await getOrderByNumber(order_number);
    res.status(201).json(result);
  } catch (error) {
    console.error("Ошибка при добавлении данных:", error);
    res.status(500).send("Ошибка при добавлении данных");
  }
};

module.exports = createOrders;
