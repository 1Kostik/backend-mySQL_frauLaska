const pool = require("../../db");

const { getProduct } = require("../products");
const getOrderById = require("./getOrdersById");
const {
  decreaseVariationCount,
  increasePopularity,
} = require("../products/updateProducts");

const sendEmail = require("../../services/sendMail");
const sendTelegramNotification = require("../../services/sendTelegramNotification");

const saveTableDataOrders = async (
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
    throw new Error("Values must be a non-empty array");
  }

  const query = `INSERT INTO ${tableName} (${columns.join(
    ", "
  )}) VALUES (${values.map(() => "?").join(", ")})`;

  try {
    const [result] = await pool.execute(query, values);
    return result.insertId;
  } catch (error) {
    console.error("Error during database operation", error);
    throw new Error("Database operation failed");
  }
};

const saveTableDataOrderItems = async (
  tableName,
  data,
  orderId,
  columns,
  mapFunc
) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`No ${tableName} to insert`);
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) => value !== undefined && value !== null && value !== ""
    )
  );

  if (filteredData.length === 0) {
    throw new Error(`No ${tableName} to insert after filtering empty fields`);
  }

  const values = filteredData.map((item) => {
    const mappedValues = mapFunc(item);
    return [...mappedValues, orderId];
  });

  if (!Array.isArray(values) || values.length === 0) {
    throw new Error(`Values for ${tableName} must be a non-empty array`);
  }

  const placeholders = values
    .map(() => `(${columns.map(() => "?").join(", ")}, ?)`)
    .join(", ");
  const flattenedValues = values.flat();

  const query = `INSERT INTO ${tableName} (${columns.join(
    ", "
  )}, orders_items_id) VALUES ${placeholders}`;

  try {
    await pool.execute(query, flattenedValues);
  } catch (error) {
    console.error(`Error during inserting into ${tableName}`, error);
    throw new Error("Database operation failed");
  }
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

  try {
    const items = await Promise.all(
      orderItems.map(async (item) => await getProduct(item.product_id))
    );

    const order_item_array = items.map((item, i) => {
      const { id, product_code, title } = item;
      const item_variation = item.variations.find(
        (variation) =>
          variation.size === orderItems[i].size &&
          variation.color === orderItems[i].color
      );

      decreaseVariationCount(item_variation.id, orderItems[i].count);
      increasePopularity(id);

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
        full_price: orderItems[i].full_price,
        discount: orderItems[i].discount,
      };
    });

    const total = order_item_array.reduce(
      (acc, item) => item.total_cost + acc,
      0
    );

    const date = new Date();
    const order_date = date.toLocaleString('en-US', {
        timeZone: 'Europe/Kyiv',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/, /g, ' ');

    const order = {
      status: "В очікуванні",
      payment_status: "Не сплачено",
      total_amount: total,
      order_items: order_item_array,
    };
    const { status, payment_status, total_amount, order_items } = order;

    const deliveryCityValue = delivery_city ?? null;
    const deliveryDestinationValue = delivery_destination ?? null;
    const recipientNameValue = recipient_name ?? null;
    const recipientLastNameValue = recipient_last_name ?? null;
    const recipientPhoneValue = recipient_phone ?? null;

    const orderId = await saveTableDataOrders(
      "orders",
      status,
      payment_status,
      payment_method,
      delivery_type,
      deliveryCityValue,
      deliveryDestinationValue,
      total_amount,
      order_date,
      name,
      last_name,
      email,
      phone,
      recipientNameValue,
      recipientLastNameValue,
      recipientPhoneValue,
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
        "full_price",
        "discount",
      ],
      (item) => [
        item.product_id,
        item.title,
        item.count,
        item.total_cost,
        item.color,
        item.size,
        item.product_code,
        item.full_price,
        item.discount ? item.discount : null,
      ]
    );

    const orderResult = await getOrderById(orderId);

    if (orderResult.payment_method === "Накладний платіж") {
      await sendEmail(orderResult);
      await sendTelegramNotification(orderResult);
    }

    res.status(201).json(orderResult);
  } catch (error) {
    console.error("Ошибка при добавлении данных:", error);
    res.status(500).send("Ошибка при добавлении данных");
  }
};

module.exports = createOrders;
