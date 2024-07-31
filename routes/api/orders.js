const express = require("express");
const {
  createOrders,
  deleteOrder,
  getOrderByNumber,
  getAllOrders,
} = require("../../controllers");
const router = express.Router();

router.get("/orders", getAllOrders);
router.get("/orders/:order_number", getOrderByNumber);
router.post("/orders", createOrders);
router.delete("/orders/:order_number", deleteOrder);
module.exports = router;
