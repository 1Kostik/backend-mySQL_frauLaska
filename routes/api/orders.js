const express = require("express");
const {
  createOrders,
  deleteOrder,
  getAllOrders,
  makePayment,
  getOrderHandler,
} = require("../../controllers");

const router = express.Router();

router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderHandler);
router.post("/orders", createOrders);
router.delete("/orders/:id", deleteOrder);
router.post("/orders/payment", makePayment);

module.exports = router;
