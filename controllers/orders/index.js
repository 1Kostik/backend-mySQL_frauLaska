const createOrders = require("./createOrders");
const deleteOrder = require("./deleteOrders");
const makePayment = require("./makePayment");
const { getAllOrders } = require("./getOrders");
const getOrderHandler = require("./getOrderHandler");

module.exports = {
  createOrders,
  deleteOrder,
  getOrderHandler,
  getAllOrders,
  makePayment,
};
