const createOrders = require("./createOrders");
const deleteOrder = require("./deleteOrders");
const { getAllOrders } = require("./getOrders");
const getOrderHandler = require("./getOrderHandler");
const { updateOrder, updateOrderStatus } = require("./updateOrder");

const makePayment = require("./makePayment");
const liqpayCallback = require("./liqpayCallack");

module.exports = {
  createOrders,
  deleteOrder,
  getOrderHandler,
  getAllOrders,
  makePayment,
  liqpayCallback,
  updateOrder,
  updateOrderStatus,
};
