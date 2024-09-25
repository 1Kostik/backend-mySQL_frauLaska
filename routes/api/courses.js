const express = require("express");
const { sendCoursesNotification } = require("../../controllers");

const router = express.Router();

router.post("/courses", sendCoursesNotification);

module.exports = router;
