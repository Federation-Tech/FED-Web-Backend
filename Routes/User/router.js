const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const controller = require("../../controllers/user");
const { postData } = require("../../../controllers/registrationController");
//registration
router.post("/user/register", postData);
//login user
router.post("/login", controller.login);
module.exports = router;
