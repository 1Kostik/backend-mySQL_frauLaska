const express = require("express");
const authenticate = require("../../middleware/aurhenticate");
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
} = require("../../controllers");

const router = express.Router();

router.get("/products/:id", getProduct);
router.get("/products", getAllProductsHandler);
router.post(
  "/products",
  authenticate,
  upload.array("imageUrls"),
  createProducts
);
router.patch(
  "/products/:id",
  authenticate,
  upload.array("imageUrls"),
  updateProducts
);
router.delete("/products/feedbacks/:id", authenticate, deleteFeedbacks);
router.delete("/products/variations/:id", authenticate, deleteVariations);
router.delete("/products/images/:id", authenticate, deleteImages);
router.delete("/products/:id", authenticate, deleteProducts);

module.exports = router;
