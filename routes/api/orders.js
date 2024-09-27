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
const authenticate = require("../../middleware/aurhenticate");

const router = express.Router();

router.get("/orders", authenticate, getAllOrders);
router.get("/orders/:id", authenticate, getOrderHandler);
router.post("/orders", createOrders);
router.delete("/orders/:id", authenticate, deleteOrder);
router.put("/orders/:id", authenticate, updateOrder);
router.patch("/orders/payment-status/:id", authenticate, changePaymentStatus);
router.post("/orders/payment", makePayment);
router.post("/liqpay-callback", liqpayCallback);

module.exports = router;
