const createOrders = require("./createOrders");
const deleteOrder = require("./deleteOrders");
const { getAllOrders } = require("./getOrders");
const getOrderHandler = require("./getOrderHandler");
const {
  updateOrder,
  updateOrderStatus,
  updatePaymentStatus,
} = require("./updateOrder");

const makePayment = require("./makePayment");
const liqpayCallback = require("./liqpayCallack");
const changePaymentStatus = require("./changePaymentStatus");

module.exports = {
  createOrders,
  deleteOrder,
  getOrderHandler,
  getAllOrders,
  makePayment,
  liqpayCallback,
  updateOrder,
  updateOrderStatus,
  updatePaymentStatus,
  changePaymentStatus,
};
