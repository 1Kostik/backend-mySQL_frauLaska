const createOrders=require('./createOrders');
const deleteOrder = require('./deleteOrders');
const { getAllOrders, getOrderByNumber } = require('./getOrdersAndById');
module.exports={createOrders,deleteOrder,getOrderByNumber,
    getAllOrders,}