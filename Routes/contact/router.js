const express = require("express");
const router = express.Router();

// Controller
const contactController = require("../../controllers/contact/contactController");

// Public || Post || Contact Us
router.post("/postContact", contactController.postcontact);

// Private (Admin) || Get || Contact Us
router.get("/getContact", contactController.getContact);

module.exports = router;
