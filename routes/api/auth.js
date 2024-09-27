const express = require("express");
const { login,
     logout,
    //   register
     } = require("../../controllers");
const authenticate = require("../../middleware/aurhenticate");

const router = express.Router();
// router.post("/new-user/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

module.exports = router;
