const LiqPay = require("liqpayjs-sdk");

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
    result_url: `https://helthyfun.space/ordered?order_id=${id}&email=${email}`,
    server_url:
      "https://helthyfun.space/api/liqpay-callback",
    description: `Оплата замовлення у магазині Frau Laska;\n Номер замовлення: ${id};\n ${titleHandler(
      order_items
    )}`,
    order_id: `order_idK_${id}`,
    amount: total_amount,
    info: email,
  };

  const paymentParams = liqpay.cnb_object(paymentData);
  const liqpayUrl = `https://www.liqpay.ua/api/3/checkout?data=${paymentParams.data}&signature=${paymentParams.signature}`;

  res.json({ redirectUrl: liqpayUrl, order_id: id });
};

module.exports = makePayment;
