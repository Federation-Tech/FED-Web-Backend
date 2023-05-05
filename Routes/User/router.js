const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Controllers
const logincontroller = require("../../controllers/user/login");
const registrationController = require("../../controllers/user/registrationController");
const verification = require("../../controllers/user/verification");

//registration
router.post("/register", registrationController.register);

//login user
router.post("/login", logincontroller.login);

//email verification link
router.get("/verification/:token", verification.verify);

module.exports = router;
