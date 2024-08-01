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
  getOrderByNumber,
  makePayment,
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
  getOrderByNumber,
  getAllOrders,
  makePayment,
};
