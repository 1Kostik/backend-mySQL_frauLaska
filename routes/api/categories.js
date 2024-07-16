const express = require("express");
const authenticate = require("../../middleware/aurhenticate");
const {    
  createCategories,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../../controllers");

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", createCategories);
router.patch("/categories/:id", updateCategories);
router.delete("/categories/:id", deleteCategories);

module.exports = router;
