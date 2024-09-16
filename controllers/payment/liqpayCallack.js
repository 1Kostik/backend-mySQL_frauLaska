const crypto = require("crypto");

const getOrderById = require("../orders/getOrdersById");
const { updatePaymentStatus } = require("../orders/updateOrder");
const { updatePaymentInfo } = require("../orders/updateOrder");

const sendEmail = require("../../services/sendMail");
const sendTelegramNotification = require("../../services/sendTelegramNotification");

const { PRIVATE_KEY, PUBLIC_KEY } = process.env;

const verifySignature = (data, signature) => {
  const calculatedSignature = crypto
    .createHash("sha1")
    .update(`${PRIVATE_KEY}${data}${PRIVATE_KEY}`)
    .digest("base64");
  return calculatedSignature === signature;
};

const liqpayCallback = async (req, res) => {
  const { data, signature } = req.body;

  if (verifySignature(data, signature)) {
    try {
      const decodedData = JSON.parse(
        Buffer.from(data, "base64").toString("utf8")
      );

      const paymentStatus = decodedData.status;
      const orderId = decodedData.order_id;

      if (paymentStatus === "success") {
        console.log(`Платіж успішно завершено для замовлення: ${orderId}`);

        const orderIdNumber = (orderId) => {
          return orderId.split("_")[2];
        };

        await updatePaymentStatus(orderIdNumber(orderId), "Сплачено");
        await updatePaymentInfo(orderIdNumber(orderId), decodedData);

        const order = await getOrderById(orderIdNumber(orderId));

        if (order.payment_status === "Сплачено") {
          await sendEmail(order);
          await sendTelegramNotification(order);
        }

        res.status(200).send("Callback обработан успешно");
      } else {
        console.log(`Платіж невдалий для замовлення: ${orderId}`);
        res.status(400).send("Платіж невдалий");
      }
    } catch (error) {
      console.error("Error handling callback:", error);
      res.status(500).send("Помилка обробки callback");
    }
  } else {
    res.status(400).send("Невірний підпис");
  }
};

module.exports = liqpayCallback;