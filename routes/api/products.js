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

router.post("/products", upload.array("imageUrls"), createProducts);

router.patch("/products/:id", upload.array("imageUrls"), updateProducts);
router.patch("/products/variations/increase/:id", increaseProductCount);
router.patch("/products/variations/decrease/:id", decreaseProductCount);

router.delete("/products/feedbacks/:id", deleteFeedbacks);
router.delete("/products/variations/:id", deleteVariations);
router.delete("/products/images/:id", deleteImages);
router.delete("/products/:id", deleteProducts);

module.exports = router;
