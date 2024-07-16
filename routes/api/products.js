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
router.post("/products", upload.array("imageUrls"), createProducts);
router.patch("/products/:id",upload.array("imageUrls"), updateProducts);
router.delete("/products/feedbacks/:id", deleteFeedbacks);
router.delete("/products/variations/:id", deleteVariations);
router.delete("/products/images/:id", deleteImages);
router.delete("/products/:id", deleteProducts);

module.exports = router;
