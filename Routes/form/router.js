const express = require("express");
const router = express.Router();
const formController = require("../../controllers/form/formController");
const formRegistration = require("../../controllers/form/formRegistration");

//get Form
router.get("/getform", formController.getForm);

//toggle Form
router.get("/toggleform", formController.toggleForm);

//add Form
router.post("/addForm", formController.addForm);

//edit Form
router.patch("/updateForm", formController.updateForm);

//delete Form
router.delete("/deleteForm", formController.deleteForm);

//register Form
router.post("/register", formRegistration.register);

module.exports = router;
