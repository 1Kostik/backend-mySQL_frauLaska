const {
  login,
  logout,
  //  register,
  userFindById,
} = require("./auth");
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
  getPopularityProducts,
} = require("./products");

const {
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
  getCategoriesProductCount,
  getCheckedItems,
} = require("./categories");
const {
  createOrders,
  deleteOrder,
  getAllOrders,
  getOrderHandler,
  updateOrder,
  makePayment,
  liqpayCallback,
  changePaymentStatus,
  getOrderById,
} = require("./orders");

const { searchSettlements, getWarehouses } = require("./newPost");
const sendCoursesNotification = require("./courses");

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
  // register,
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
  changePaymentStatus,
  searchSettlements,
  getWarehouses,
  getOrderById,
  getPopularityProducts,
  sendCoursesNotification,
  userFindById,
  getCheckedItems
};
