const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const memberController = require("./../../controllers/members/membersController");
const auth = require("./../../middleware/validator");

// router.use(validate);

// Private || Add Member
router.post(
  "/addMember",
  [
    check("name", "name is Required").not().isEmpty(),
    check("access", "access is Required").not().isEmpty(),
    check("email", "email is Required").not().isEmpty(),
    check("img", "img is Required").not().isEmpty(),
  ],

  memberController.addMembers
);

router.post(
  "/addAlumni",
  [check("email", "email is required").not().isEmpty()],
  memberController.addAlumni
);

// auth
router.use(auth);

// Public || Get All Mebers Data
router.get("/", memberController.showMembers);

module.exports = router;
