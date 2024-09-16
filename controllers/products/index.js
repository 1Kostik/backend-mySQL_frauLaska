const { createProducts, upload } = require("./createProducts");
const getAllProductsHandler = require("./getAllProductsHandler");
const {
  updateProducts,
  increaseVariationCount,
  decreaseVariationCount,
} = require("./updateProducts");
const deleteProducts = require("./deleteProducts");
const getProductHandler = require("./getProductHandler");
const deleteImages = require("./deleteImages");
const deleteVariations = require("./deleteVariations");
const deleteFeedbacks = require("./deleteFeedbacks");
const increaseProductCount = require("./increaseProductCount");
const decreaseProductCount = require("./decreaseProductCount");
const { getMainImage, getProduct, getImages } = require("./getProduct");



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
  increaseVariationCount,
  decreaseVariationCount,
  increaseProductCount,
  decreaseProductCount,
  getProduct,
  getImages,
  getMainImage,
};
