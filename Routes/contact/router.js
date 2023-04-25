const express = require("express");
const router = express.Router();
const postContact = require("../../controllers/contact/postContact")

router.post("/postcontact",postContact);

module.exports = router;
