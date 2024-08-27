const express = require("express");
const { searchSettlements, getWarehouses } = require("../../controllers");

const router = express.Router();

router.post("/new-post/settlements", searchSettlements);
router.post("/new-post/warehouses", getWarehouses);

module.exports = router;
