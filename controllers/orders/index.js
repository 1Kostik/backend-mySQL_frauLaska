const createOrders=require('./createOrders');
const deleteOrder = require('./deleteOrders');
const makePayment = require('./makePayment');
const { getAllOrders, getOrderByNumber } = require('./getOrdersAndById');
module.exports = {
  createOrders,
  deleteOrder,
  getOrderByNumber,
  getAllOrders,
  makePayment,
};