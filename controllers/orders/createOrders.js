const db = require("../../db");
const getOrderById = require("./getOrdersById");

const saveTableDataOrders = (
  tableName,
  status,
  payment_status,
  payment_method,
  delivery_type,
  post_office_number,
  total_amount,
  order_date,
  name,
  last_name,
  email,
  phone,
  recipient_name,
  recipient_last_name,
  recipient_phone,
  columns,
  valueMapper
) => {
  return new Promise(async (resolve, reject) => {
    const values = valueMapper({
      status,
      payment_status,
      payment_method,
      delivery_type,
      post_office_number,
      total_amount,
      order_date,
      name,
      last_name,
      email,
      phone,
      recipient_name,
      recipient_last_name,
      recipient_phone,
    });

    if (!Array.isArray(values) || values.length === 0) {
      return reject(new Error("Values must be a non-empty array"));
    }

    const query = `INSERT INTO ${tableName} (${columns.join(
      ", "
    )}) VALUES (${values.map(() => "?").join(", ")})`;

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, values, (error, result) => {
          if (error) {
            console.error("Error during database operation", error);
            return reject(new Error("Database operation failed"));
          }
          resolve(result);
        });
      });

      resolve(result.insertId);
    } catch (error) {
      console.error("Error during database operation", error);
      reject(new Error("Database operation failed"));
    }
  });
};

const saveTableDataOrderItems = (
  tableName,
  data,
  orderId,
  columns,
  mapFunc
) => {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(data) || data.length === 0) {
      return reject(`No ${tableName} to insert`);
    }

    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) => value !== undefined && value !== null && value !== ""
      )
    );

    if (filteredData.length === 0) {
      return reject(`No ${tableName} to insert after filtering empty fields`);
    }

    const values = filteredData.map((item) => {
      const mappedValues = mapFunc(item);
      return [...mappedValues, orderId]; // Добавляем orderId к значениям
    });

    if (!Array.isArray(values) || values.length === 0) {
      return reject(`Values for ${tableName} must be a non-empty array`);
    }

    const placeholders = values
      .map(() => `(${columns.map(() => "?").join(", ")}, ?)`) // Изменение здесь
      .join(", ");
    const flattenedValues = values.flat();

    const query = `INSERT INTO ${tableName} (${columns.join(
      ", "
    )}, orders_items_id) VALUES ${placeholders}`; // Добавляем orders_items_id в запрос

    try {
      await db.query(query, flattenedValues);
      resolve();
    } catch (error) {
      console.error(`Error during inserting into ${tableName}`, error);
      reject(new Error("Database operation failed"));
    }
  });
};

const createOrders = async (req, res) => {
  const {
    status,
    payment_status,
    payment_method,
    delivery_type,
    post_office_number,
    total_amount,
    order_date,
    name,
    last_name,
    email,
    phone,
    recipient_name,
    recipient_last_name,
    recipient_phone,
    order_items,
  } = req.body;

  try {
    const orderId = await saveTableDataOrders(
      "orders",
      status,
      payment_status,
      payment_method,
      delivery_type,
      post_office_number,
      total_amount,
      order_date,
      name,
      last_name,
      email,
      phone,
      recipient_name,
      recipient_last_name,
      recipient_phone,
      [
        "status",
        "payment_status",
        "payment_method",
        "delivery_type",
        "post_office_number",
        "total_amount",
        "order_date",
        "name",
        "last_name",
        "email",
        "phone",
        "recipient_name",
        "recipient_last_name",
        "recipient_phone",
      ],
      (item) => [
        item.status,
        item.payment_status,
        item.payment_method,
        item.delivery_type,
        item.post_office_number,
        item.total_amount,
        item.order_date,
        item.name,
        item.last_name,
        item.email,
        item.phone,
        item.recipient_name,
        item.recipient_last_name,
        item.recipient_phone,
      ]
    );

    await saveTableDataOrderItems(
      "order_items",
      order_items,
      orderId, // Передаем orderId
      [
        "product_id",
        "title",
        "count",
        "total_cost",
        "color",
        "size",
        "product_code",
      ],
      (item) => [
        item.product_id,
        item.title,
        item.count,
        item.total_cost,
        item.color,
        item.size,
        item.product_code,
      ]
    );

    const result = await getOrderById(orderId);
    res.status(201).json(result);
  } catch (error) {
    console.error("Ошибка при добавлении данных:", error);
    res.status(500).send("Ошибка при добавлении данных");
  }
};

module.exports = createOrders;
