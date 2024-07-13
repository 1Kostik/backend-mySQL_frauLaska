const express = require("express");

const {
  createProducts,
  getProduct,
  getAllProductsHandler,
  updateProducts,
  updateImages,
  deleteProducts,
  deleteImages,
  updateVolumes,
  deleteVolumes,
  updateColors,
  deleteColors,
  upload,
} = require("../../controllers");

const router = express.Router();

router.get("/products/:id", getProduct);
router.get("/products", getAllProductsHandler);
router.post("/products", upload.array("imageUrls"), createProducts);
router.patch("/products/:id", updateProducts);
router.patch("/products/images/:id", updateImages);
router.patch("/products/volumes/:id", updateVolumes);
router.patch("/products/colors/:id", updateColors);
router.delete("/products/colors/:id", deleteColors);
router.delete("/products/volumes/:id", deleteVolumes);
router.delete("/products/images/:id", deleteImages);
router.delete("/products/:id", deleteProducts);

module.exports = router;
