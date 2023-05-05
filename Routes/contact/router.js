const express = require("express");
const router = express.Router();
const postContact = require("../../controllers/contact/postContact");

// Public || Post || Contact Us
router.post("/postcontact", postContact);

module.exports = router;
