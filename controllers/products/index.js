const { createProducts, upload } = require("./createProducts");
const getAllProductsHandler = require("./getAllProductsHandler");
const { updateProducts, updateVariationCount } = require("./updateProducts");
const deleteProducts = require("./deleteProducts");
const getProductHandler = require("./getProductHandler");
const deleteImages = require("./deleteImages");
const deleteVariations = require("./deleteVariations");
const deleteFeedbacks = require("./deleteFeedbacks");

module.exports = {
  createProducts,
  getAllProductsHandler,
  updateProducts,
  deleteProducts,
  getProductHandler,
  deleteImages,
  deleteVariations,
  deleteFeedbacks,
  upload,
  updateVariationCount,
};
