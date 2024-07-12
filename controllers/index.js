const {
  uploadPhoto,
  uploadPhotos,
  deletePhoto,
  deletePhotos,
} = require("./upload");

const {
  createProducts,
  getAllProducts,
  updateProducts,
  deleteProducts,
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
  getAllProducts,
  updateProducts,
  deleteProducts,
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
};
