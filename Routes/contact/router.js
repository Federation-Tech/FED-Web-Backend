const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contact/contactController");

// Public || Post || Contact Us
router.post("/postcontact", contactController.postcontact);

// Private (Admin) || Get || Contact Us
router.get("/getContact", contactController.getContact);

module.exports = router;
