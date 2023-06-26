const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Controller
const contactController = require("../../controllers/contact/contactController");

// Public || Post || Contact Us
router.post(
  "/postContact",
  [check("name", "name is Required").not().isEmpty()],
  [check("email", "email is Required").not().isEmpty()],
  [check("message", "message is Required").not().isEmpty()],
  contactController.postcontact
);

// Private (Admin) || Get || Contact Us ------------- pending admin validation
router.get("/getContact", contactController.getContact);

module.exports = router;
