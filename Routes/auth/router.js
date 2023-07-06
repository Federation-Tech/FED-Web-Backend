const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Controllers
const logincontroller = require("../../controllers/auth/login");
const forgetPasswordcontroller = require("../../controllers/auth/forgetPassword");
const registrationController = require("../../controllers/auth/registrationController");
const googleRegistration = require("../../controllers/auth/googleRegistration");
const googleSignUpverification = require("../../controllers/auth/googleSignUpverification");
const verification = require("../../controllers/auth/verification");
const sendMail = require("./../../mailer/beta/newMailer");

//registration
router.post("/register", registrationController.register);
router.post("/googleregister", googleRegistration.register);
router.post(
  "/googleverification",
  googleSignUpverification.googleSignUpVerification
);

//login auth
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
router.post("/changepassword", forgetPasswordcontroller.resetpassword);


module.exports = router;
