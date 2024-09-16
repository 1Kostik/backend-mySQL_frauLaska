const createOrders = require("./createOrders");
const deleteOrder = require("./deleteOrders");
const { getAllOrders, getPaymentStatus } = require("./getOrders");
const getOrderHandler = require("./getOrderHandler");
const {
  updateOrder,
  updateOrderStatus,
  updatePaymentStatus,
  updatePaymentInfo,
} = require("./updateOrder");

const makePayment = require("../payment/makePayment");
const liqpayCallback = require("../payment/liqpayCallack");
const changePaymentStatus = require("./changePaymentStatus");
const getOrderById = require("./getOrdersById");

module.exports = {
  createOrders,
  deleteOrder,
  getOrderHandler,
  getAllOrders,
  getOrderById,
  makePayment,
  liqpayCallback,
  updateOrder,
  updateOrderStatus,
  updatePaymentStatus,
  changePaymentStatus,
  updatePaymentInfo,
};
