const { login, logout } = require("./auth");
const {
  createProducts,
  getProductHandler,
  getAllProductsHandler,
  updateProducts,
  deleteProducts,
  deleteImages,
  deleteVariations,
  deleteFeedbacks,
  upload,
  decreaseProductCount,
  increaseProductCount,
} = require("./products");

const {
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
  getCategoriesProductCount,
} = require("./categories");
const {
  createOrders,
  deleteOrder,
  getAllOrders,
  getOrderHandler,
  updateOrder,
  makePayment,
  liqpayCallback,
} = require("./orders");

module.exports = {
  createProducts,
  getProductHandler,
  getAllProductsHandler,
  updateProducts,
  deleteProducts,
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
  deleteImages,
  deleteVariations,
  deleteFeedbacks,
  upload,
  login,
  logout,
  getCategoriesProductCount,
  createOrders,
  deleteOrder,
  getOrderHandler,
  getAllOrders,
  updateOrder,
  makePayment,
  liqpayCallback,
  decreaseProductCount,
  increaseProductCount,
};
