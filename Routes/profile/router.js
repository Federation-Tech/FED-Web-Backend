const express = require("express");
const router = express.Router();
const profilecontroller = require("../../controllers/profile/getdata");
const middleware = require("../../middleware/validator");

//registration
router.get("/getprofile", profilecontroller.getdata);

module.exports = router;
