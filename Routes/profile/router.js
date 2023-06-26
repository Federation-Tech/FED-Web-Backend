const express = require("express");
const router = express.Router();
const profilecontroller = require("../../controllers/profile/getdata");
const updateProfile = require("../../controllers/auth/updateProfile");

//registration
router.get("/getprofile", profilecontroller.getdata);

//update profile
router.post("/updateProfile", updateProfile.updateData);

module.exports = router;
