const express = require("express");
const authenticate = require("../../middleware/aurhenticate");
const {
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
  getCategoriesProductCount,
  getCheckedItems,
} = require("../../controllers");

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/product-count", getCategoriesProductCount);
router.post("/categories/checked-items", getCheckedItems);
router.post("/categories", authenticate, createCategories);
router.patch("/categories/:id", authenticate, updateCategories);
router.delete("/categories/:id", authenticate, deleteCategories);

module.exports = router;
