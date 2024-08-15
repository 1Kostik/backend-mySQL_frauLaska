const LiqPay = require("liqpayjs-sdk");
const getProduct = require("../products/getProduct");

const { PRIVATE_KEY, PUBLIC_KEY } = process.env;

const liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);

const makePayment = (req, res) => {
  const { total_amount, id, order_items, email } = req.body;

  const titleHandler = (order_items) => {
    return order_items
      .map(({ title, count }) => `${title}: ${count}шт`)
      .join("\n");
  };

  const paymentData = {
    version: 3,
    action: "pay",
    currency: "UAH",
    result_url: `http://localhost:3000/ordered?order_id=${id}&email=${email}`,
    server_url:
      "https://a0d3-31-144-216-252.ngrok-free.app/api/liqpay-callback",
    // rro_info: { delivery_emails: ["dimside29@gmail.com"], items: order_items },
    info: `${{ email, order_items }}`,

    description: `Оплата замовлення у магазині Frau Laska\n Номер замовлення: ${id}\n ${titleHandler(
      order_items
    )}`,
    order_id: `order_id_${id}`,
    amount: total_amount,
  };

  const paymentParams = liqpay.cnb_object(paymentData);
  const liqpayUrl = `https://www.liqpay.ua/api/3/checkout?data=${paymentParams.data}&signature=${paymentParams.signature}`;

  res.json({ redirectUrl: liqpayUrl, order_id: id });
};

module.exports = makePayment;
