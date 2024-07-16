const express = require("express");
const { login, logout } = require("../../controllers");
const authenticate = require("../../middleware/aurhenticate");

const router = express.Router();

router.post("/login", login);
router.post("/logout",authenticate, logout);

module.exports = router;
