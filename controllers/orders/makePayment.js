const LiqPay = require("liqpayjs-sdk");
const getProduct = require("../products/getProduct");

const { PRIVATE_KEY, PUBLIC_KEY } = process.env;

const liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);

const makePayment = (req, res) => {
  const { total_amount, id, order_items, email } = req.body;

  const paymentData = {
    version: 3,
    action: "pay",
    currency: "UAH",
    result_url: `http://localhost:3000/ordered?order_id=${id}&email=${email}`,
    server_url:
      "https://72b9-31-144-104-136.ngrok-free.app/api/liqpay-callback",
    rro_info: { delivery_emails: ["dimside29@gmail.com"], items: order_items },
    info: `${email}`,

    description: `Оплата замовлення у магазині Frau Laska номер: ${id}`,
    order_id: `order_id_${id}`,
    amount: total_amount,
  };

  const paymentParams = liqpay.cnb_object(paymentData);
  const liqpayUrl = `https://www.liqpay.ua/api/3/checkout?data=${paymentParams.data}&signature=${paymentParams.signature}`;

  res.json({ redirectUrl: liqpayUrl, order_id: id });
};

module.exports = makePayment;
