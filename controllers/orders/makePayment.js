const LiqPay = require("liqpayjs-sdk");

const { PRIVATE_KEY, PUBLIC_KEY } = process.env;

const liqpay = new LiqPay(PUBLIC_KEY, PRIVATE_KEY);

const makePayment = (req, res) => {
  const { totalAmount } = req.body;

  const paymentData = {
    version: 3,
    action: "pay",
    amount: totalAmount,
    currency: "UAH",
    description: "Payment descrваіфаiption!!!!!!!!!!",
    order_id: "order_id_1111",
  };

  const paymentParams = liqpay.cnb_object(paymentData);
  const liqpayUrl = `https://www.liqpay.ua/api/3/checkout?data=${paymentParams.data}&signature=${paymentParams.signature}`;

  res.json({ redirectUrl: liqpayUrl });
};

module.exports = makePayment;
