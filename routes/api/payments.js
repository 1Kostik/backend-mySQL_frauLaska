const express = require("express");
const { makePayment, liqpayCallback } = require("../../controllers");

const router = express.Router();

router.post("/payment", makePayment);
router.post("/liqpay-callback", liqpayCallback);

module.exports = router;
