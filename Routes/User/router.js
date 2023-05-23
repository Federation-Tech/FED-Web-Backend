const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check } = require("express-validator");

// Controllers
const logincontroller = require("../../controllers/user/login");
const forgetPasswordcontroller = require("../../controllers/user/forgetPassword");
const registrationController = require("../../controllers/user/registrationController");
const verification = require("../../controllers/user/verification");
const sendMail = require("./../../mailer/newMailer");

//registration
router.post("/", registrationController.register);

//login user
router.post("/login", logincontroller.login);

//email verification link
router.get("/verification/:token", verification.verify);

// send mail
router.post(
  "/sendEmail",
  [check("email", "email is Required").not().isEmpty()],
  [check("message", "message is Required").not().isEmpty()],
  [check("name", "name is Required").not().isEmpty()],
  sendMail.sendEmail
);

//send otp
router.post("/sendotp", forgetPasswordcontroller.sendotp);

//validate otp
router.post("/validate", forgetPasswordcontroller.verifyotp);

//change password
// router.post("/changepassword");

module.exports = router;
