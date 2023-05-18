const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Public || Get All Mebers Data
router.get("/", memberController.showMembers);

// Private || Add Member
router.post(
  "/addMember",
  //   [check("name", "name is Required").not().isEmpty()],
  memberController.addMembers
);

module.exports = router;
