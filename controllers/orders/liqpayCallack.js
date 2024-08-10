const crypto = require("crypto");
const LiqPay = require("liqpayjs-sdk");
const { PRIVATE_KEY, PUBLIC_KEY } = process.env;
const { updateOrderStatus } = require("./updateOrder");
// const liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);

const verifySignature = (data, signature) => {
  const calculatedSignature = crypto
    .createHash("sha1")
    .update(`${PRIVATE_KEY}${data}${PRIVATE_KEY}`)
    .digest("base64");
  return calculatedSignature === signature;
};

const liqpayCallback = (req, res) => {
  // console.log("liqpayCallback");
  const { data, signature } = req.body;

  if (verifySignature(data, signature)) {
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf8")
    );
    // console.log("decodedData", decodedData);
    const paymentStatus = decodedData.status;
    const orderId = decodedData.order_id;

    // Логика обработки статуса платежа
    if (paymentStatus === "success") {
      console.log(`Платеж успешно завершен для заказа: ${orderId}`);
      const orderIdNumber = (orderId) => {
        return orderId.split("_")[2];
      };
      console.log("orderIdNumber", orderIdNumber(orderId));
      updateOrderStatus(orderIdNumber(orderId), "Сплачено");

      // Дополнительная обработка, например, обновление базы данных
    } else {
      console.log(`Платеж неуспешен для заказа: ${orderId}`);
      // Обработка ошибок
    }

    res.status(200).send("Callback обработан успешно");
  } else {
    res.status(400).send("Неверная подпись");
  }
};

module.exports = liqpayCallback;