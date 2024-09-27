const express = require("express");
const authenticate = require("../../middleware/aurhenticate");
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
  increaseProductCount,
  decreaseProductCount,
  getPopularityProducts,
} = require("../../controllers");

const router = express.Router();

router.get("/products/:id", getProductHandler);
router.get("/products", getAllProductsHandler);
router.get("/products-popularity", getPopularityProducts);

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
router.patch("/products/variations/increase/:id", increaseProductCount);
router.patch("/products/variations/decrease/:id", decreaseProductCount);

router.delete("/products/feedbacks/:id", authenticate, deleteFeedbacks);
router.delete("/products/variations/:id", authenticate, deleteVariations);
router.delete("/products/images/:id", authenticate, deleteImages);
router.delete("/products/:id", authenticate, deleteProducts);

module.exports = router;
