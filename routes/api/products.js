const express = require("express");

const {
  createProducts,
  getAllProducts,
  updateProducts,
  deleteProducts,
} = require("../../controllers");

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", createProducts);
router.put("/products/:id", updateProducts);
router.delete("/products/:id", deleteProducts);

module.exports = router;


