const express = require("express");
const router = express.Router();
const formController = require("../../controllers/form/formController");

//get Form
router.get("/getform", formController.getForm);

//add Form
router.post("/addForm", formController.addForm);

//edit Form
router.patch("/updateForm", formController.updateForm);

//delete Form
router.delete("/deleteForm", formController.deleteForm);

module.exports = router;
