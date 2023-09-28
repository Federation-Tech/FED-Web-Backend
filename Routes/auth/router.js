const express = require("express");
const mongoose = require("mongoose");
const { check } = require("express-validator");

// Controllers
const logincontroller = require("../../controllers/auth/login");
const verification = require("../../controllers/auth/verification");
const updateProfile = require("../../controllers/auth/updateProfile");
const googleRegistration = require("../../controllers/auth/googleRegistration");
const forgetPasswordcontroller = require("../../controllers/auth/forgetPassword");
const registrationController = require("../../controllers/auth/registrationController");
const googleAuth = require("../../controllers/auth/googleAuth");

// mailer
const sendMail = require("./../../mailer/beta/newMailer");

const router = express.Router();

//registration
router.post(
  "/register",
  [
    check("email", "email is Required").not().isEmpty(),
    check("password", "password is Required").not().isEmpty(),
    check("name", "name is Required").not().isEmpty(),
    check("access", "access is Required").not().isEmpty(),
    check("isvalid", "isvalid is Required").not().isEmpty(),
    check("img", "img is Required").not().isEmpty(),
    check("RollNumber", "RollNumber is Required").not().isEmpty(),
    check("School", "School is Required").not().isEmpty(),
    check("College", "College is Required").not().isEmpty(),
    check("MobileNo", "MobileNo is Required").not().isEmpty(),
    check("selected", "selected is Required").not().isEmpty(),
  ],
  registrationController.register
);
router.post("/googleregister", googleRegistration.register);

// Google Login || Public
router.post(
  "/googleverification",
  [check("email", "email is Required").not().isEmpty()],
  googleAuth.googleSignUp
);

//login auth
router.post(
  "/login",
  [
    check("username", "username is Required").not().isEmpty(),
    check("password", "password is Required").not().isEmpty(),
  ],
  logincontroller.login
);

//email verification link
router.get("/verification/:token", verification.verify);

// send mail
router.get("/resendMail/:email", verification.resendMail);

// send mail
router.post(
  "/sendEmail",
  [
    check("email", "email is Required").not().isEmpty(),
    check("message", "message is Required").not().isEmpty(),
    check("name", "name is Required").not().isEmpty(),
  ],
  sendMail.sendEmail
);

//send otp
router.post(
  "/sendotp",
  [check("email", "email is Required").not().isEmpty()],
  forgetPasswordcontroller.sendotp
);

//validate otp
router.post(
  "/validate",
  [
    check("email", "email is Required").not().isEmpty(),
    check("otp", "otp is Required").not().isEmpty(),
  ],
  forgetPasswordcontroller.verifyotp
);

//change password
router.post(
  "/changepassword",
  [
    check("email", "email is Required").not().isEmpty(),
    check("password", "password is Required").not().isEmpty(),
  ],
  forgetPasswordcontroller.resetpassword
);

//update profile
router.post(
  "/updateProfile",
  [
    check("email", "email is Required").not().isEmpty(),
    check("name", "name is Required").not().isEmpty(),
    check("RollNumber", "RollNumber is Required").not().isEmpty(),
    check("School", "School is Required").not().isEmpty(),
    check("College", "College is Required").not().isEmpty(),
    check("MobileNo", "MobileNo is Required").not().isEmpty(),
    check("selected", "selected is Required").not().isEmpty(),
  ],
  updateProfile.updateData
);

module.exports = router;
