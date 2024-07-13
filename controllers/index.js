const {
  uploadPhoto,
  uploadPhotos,
  deletePhoto,
  deletePhotos,
} = require("./upload");

const {
  createProducts,
  getProduct,
  getAllProductsHandler,
  updateProducts,
  deleteProducts,
  updateImages,
  deleteImages,
  updateVolumes,
  deleteVolumes,
  updateColors,
  deleteColors,
  upload,
} = require("./products");

const {
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("./categories");

module.exports = {
  uploadPhoto,
  uploadPhotos,
  deletePhoto,
  deletePhotos,
  createProducts,
  getProduct,
  getAllProductsHandler,
  updateProducts,
  deleteProducts,
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
  updateImages,
  deleteImages,
  updateVolumes,
  deleteVolumes,
  updateColors,
  deleteColors,
  upload,
};
