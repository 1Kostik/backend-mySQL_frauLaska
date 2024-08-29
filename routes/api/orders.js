const express = require("express");
const {
  createOrders,
  deleteOrder,
  getAllOrders,
  getOrderHandler,
  updateOrder,
  makePayment,
  liqpayCallback,
  changePaymentStatus,
} = require("../../controllers");

const router = express.Router();

router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderHandler);
router.post("/orders", createOrders);
router.delete("/orders/:id", deleteOrder);
router.put("/orders/:id", updateOrder);
router.patch("/orders/payment-status/:id", changePaymentStatus);
router.post("/orders/payment", makePayment);
router.post("/liqpay-callback", liqpayCallback);

module.exports = router;
