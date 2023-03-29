const express = require("express");
const router = express.Router();

const { postData } = require("../../../controller/registrationController");

router.post("/user/register", postData);

module.exports = router;
