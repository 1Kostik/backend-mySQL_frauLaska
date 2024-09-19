const db = require("../../db");

const { getProduct } = require("../products");
const getOrderById = require("./getOrdersById");
const { decreaseVariationCount, increasePopularity } = require("../products/updateProducts");

const sendEmail = require("../../services/sendMail");
const sendTelegramNotification = require("../../services/sendTelegramNotification");

const saveTableDataOrders = (
  tableName,
  status,
  payment_status,
  payment_method,
  delivery_type,
  delivery_city,
  delivery_destination,
  total_amount,
  order_date,
  name,
  last_name,
  email,
  phone,
  recipient_name,
  recipient_last_name,
  recipient_phone,
  call_me_back,
  columns,
  valueMapper
) => {
  return new Promise(async (resolve, reject) => {
    const values = valueMapper({
      status,
      payment_status,
      payment_method,
      delivery_type,
      delivery_city,
      delivery_destination,
      total_amount,
      order_date,
      name,
      last_name,
      email,
      phone,
      recipient_name,
      recipient_last_name,
      recipient_phone,
      call_me_back,
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
    payment_method,
    delivery_type,
    delivery_city,
    delivery_destination,
    name,
    last_name,
    email,
    phone,
    recipient_name,
    recipient_last_name,
    recipient_phone,
    call_me_back,
    order_items: orderItems,
  } = req.body;

  const pickedItems = async (orderItems) => {
    const products = await Promise.all(
      orderItems.map(async (item) => {
        const product = await getProduct(item.product_id);
        return product;
      })
    );
    return products;
  };

  pickedItems(orderItems).then(async (items) => {
    const order_item_array = items.map((item, i) => {
      const { id, product_code, title } = item;
      const item_variation = item.variations.find(
        (variation) =>
          variation.size === orderItems[i].size &&
          variation.color === orderItems[i].color
      );

      decreaseVariationCount(item_variation.id, orderItems[i].count);

      increasePopularity(id)
      
      const { price } = item_variation;
      const total_cost = price * orderItems[i].count;

      return {
        product_id: id,
        product_code,
        title,
        total_cost,
        color: orderItems[i].color,
        size: orderItems[i].size,
        count: orderItems[i].count,
      };
    });

    const total = order_item_array.reduce((acc, item) => {
      return item.total_cost + acc;
    }, 0);

    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000;
    const order_date = new Date(date.getTime() - offset)
      .toISOString()
      .split(".")[0];

    const order = {
      status: "В очікуванні",
      payment_status: "Не сплачено",
      total_amount: total,
      order_items: order_item_array,
    };
    const { status, payment_status, total_amount, order_items } = order;
    try {
      const orderId = await saveTableDataOrders(
        "orders",
        status,
        payment_status,
        payment_method,
        delivery_type,
        delivery_city,
        delivery_destination,
        total_amount,
        order_date,
        name,
        last_name,
        email,
        phone,
        recipient_name,
        recipient_last_name,
        recipient_phone,
        call_me_back,
        [
          "status",
          "payment_status",
          "payment_method",
          "delivery_type",
          "delivery_city",
          "delivery_destination",
          "total_amount",
          "order_date",
          "name",
          "last_name",
          "email",
          "phone",
          "recipient_name",
          "recipient_last_name",
          "recipient_phone",
          "call_me_back",
        ],
        (item) => [
          item.status,
          item.payment_status,
          item.payment_method,
          item.delivery_type,
          item.delivery_city,
          item.delivery_destination,
          item.total_amount,
          item.order_date,
          item.name,
          item.last_name,
          item.email,
          item.phone,
          item.recipient_name,
          item.recipient_last_name,
          item.recipient_phone,
          item.call_me_back,
        ]
      );

      await saveTableDataOrderItems(
        "order_items",
        order_items,
        orderId,
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

      const order = await getOrderById(orderId);

      if (order.payment_method === "Накладний платіж") {
        await sendEmail(order);
        await sendTelegramNotification(order);
      }

      res.status(201).json(order);
    } catch (error) {
      console.error("Ошибка при добавлении данных:", error);
      res.status(500).send("Ошибка при добавлении данных");
    }
  });
};

module.exports = createOrders;
