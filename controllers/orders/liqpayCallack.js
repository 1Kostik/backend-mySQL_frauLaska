const crypto = require("crypto");
const LiqPay = require("liqpayjs-sdk");
const { PRIVATE_KEY, PUBLIC_KEY } = process.env;
const { updatePaymentStatus } = require("./updateOrder");
// const liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);

const verifySignature = (data, signature) => {
  const calculatedSignature = crypto
    .createHash("sha1")
    .update(`${PRIVATE_KEY}${data}${PRIVATE_KEY}`)
    .digest("base64");
  return calculatedSignature === signature;
};


const liqpayCallback = (req, res) => {
  console.log('first!!!!!!!!!!!!!!!!!!!!!!!$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%%%%%')
  const { data, signature } = req.body;
console.log("verifySignature", verifySignature(data, signature));
  if (verifySignature(data, signature)) {
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf8")
    );

    const paymentStatus = decodedData.status;
    const orderId = decodedData.order_id;

    console.log("decodedData.info", decodedData);

    // Логика обработки статуса платежа
    if (paymentStatus === "success") {
      console.log(`Платеж успешно завершен для заказа: ${orderId}`);
      const orderIdNumber = (orderId) => {
        return orderId.split("_")[2];
      };

      updatePaymentStatus(orderIdNumber(orderId), "Сплачено");
      res.redirect(`http://localhost:3000/ordered?order_id=${orderId}`);

      // Дополнительная обработка, например, обновление базы данных
    } else {
      res.redirect(`http://localhost:3000`);
      console.log(`Платеж неуспешен для заказа: ${orderId}`);
      // Обработка ошибок
    }

    res.status(200).send("Callback обработан успешно");
  } else {
    res.status(400).send("Неверная подпись");
  }
};

module.exports = liqpayCallback;
