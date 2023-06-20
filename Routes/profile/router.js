const express = require("express");
const router = express.Router();
const profilecontroller = require("../../controllers/profile/getdata");

//registration
router.get("/getprofile", profilecontroller.getdata);

module.exports = router;
