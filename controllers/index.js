const { login, logout } = require("./auth");
const {
  createProducts,
  getProduct,
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
} = require("./categories");

module.exports = {
  createProducts,
  getProduct,
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
};
