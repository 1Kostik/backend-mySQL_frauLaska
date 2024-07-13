const {createProducts,upload} = require("./createProducts");
const getAllProductsHandler = require("./getAllProductsHandler");
const updateProducts = require("./updateProducts");
const deleteProducts = require("./deleteProducts");
const getProduct = require("./getProduct");
const updateImages = require("./updateImages");
const deleteImages = require("./deleteImages");
const updateVolumes = require("./updateVolumes");
const deleteVolumes = require("./deleteVolumes");
const updateColors = require("./updateColors");
const deleteColors = require("./deleteColors");

module.exports = {
  createProducts,
  getAllProductsHandler,
  updateProducts,
  deleteProducts,
  getProduct,
  updateImages,
  deleteImages,
  updateVolumes,
  deleteVolumes,
  updateColors,
  deleteColors,
  upload,
};
