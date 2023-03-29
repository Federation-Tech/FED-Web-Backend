const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const controller = require("../../controllers/user");
const registrationController = require("../../controllers/registrationController");
//registration
router.post("/register", registrationController.register);
//login user
router.post("/login", controller.login);
module.exports = router;
