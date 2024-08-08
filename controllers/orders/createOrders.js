const db = require("../../db");
const getOrderByNumber = require("./getOrders");

const saveTableDataOrders = (
  tableName,
  status,
  paymentMethod,
  deliveryType,
  postOfficeNumber,
  total_amount,
  order_date,
  name,
  lastName,
  email,
  phone,
  recipientName,
  recipientLastName,
  recipientPhone,
  columns,
  valueMapper
) => {
  return new Promise(async (resolve, reject) => {
    const values = valueMapper({
      status,
      paymentMethod,
      deliveryType,
      postOfficeNumber,
      total_amount,
      order_date,
      name,
      lastName,
      email,
      phone,
      recipientName,
      recipientLastName,
      recipientPhone,
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
    paymentMethod,
    deliveryType,
    postOfficeNumber,
    total_amount,
    order_date,
    name,
    lastName,
    email,
    phone,
    recipientName,
    recipientLastName,
    recipientPhone,
    order_items,
  } = req.body;

  try {
    const orderId = await saveTableDataOrders(
      "orders",
      status,
      paymentMethod,
      deliveryType,
      postOfficeNumber,
      total_amount,
      order_date,
      name,
      lastName,
      email,
      phone,
      recipientName,
      recipientLastName,
      recipientPhone,
      [
        "status",
        "paymentMethod",
        "deliveryType",
        "postOfficeNumber",
        "total_amount",
        "order_date",
        "name",
        "lastName",
        "email",
        "phone",
        "recipientName",
        "recipientLastName",
        "recipientPhone",
      ],
      (item) => [
        item.status,
        item.paymentMethod,
        item.deliveryType,
        item.postOfficeNumber,
        item.total_amount,
        item.order_date,
        item.name,
        item.lastName,
        item.email,
        item.phone,
        item.recipientName,
        item.recipientLastName,
        item.recipientPhone,
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
        "totalCost",
        "color",
        "size",
        "productCode",
      ],
      (item) => [
        item.product_id,
        item.title,
        item.count,
        item.totalCost,
        item.color,
        item.size,
        item.productCode,
      ]
    );

    const result = await getOrderByNumber(orderId);
    res.status(201).json(result);
  } catch (error) {
    console.error("Ошибка при добавлении данных:", error);
    res.status(500).send("Ошибка при добавлении данных");
  }
};

module.exports = createOrders;
