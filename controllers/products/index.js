const { createProducts, upload } = require("./createProducts");
const getAllProductsHandler = require("./getAllProductsHandler");
const updateProducts = require("./updateProducts");
const deleteProducts = require("./deleteProducts");
const getProduct = require("./getProduct");
const deleteImages = require("./deleteImages");
const deleteVariations = require("./deleteVariations");
const deleteFeedbacks = require("./deleteFeedbacks");

module.exports = {
  createProducts,
  getAllProductsHandler,
  updateProducts,
  deleteProducts,
  getProduct,
  deleteImages,
  deleteVariations,
  deleteFeedbacks,
  upload,
};
