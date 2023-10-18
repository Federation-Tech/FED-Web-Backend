const express = require("express");
const router = express.Router();
const formController = require("../../controllers/form/formController");
const formRegistration = require("../../controllers/form/formRegistration");
const validator = require("../../middleware/validator")

router.get("/getactiveform", formController.getactiveform)
//delete member
router.get("/deletemember", formRegistration.deleteMember);

//private
router.use(validator)
//validate leader
router.get("/verifyleader",validator, formRegistration.verifyleader);

//get Form
router.get("/getform", formController.getForm);

//get Form
router.get("/getuserform", formController.getuserform);

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

//register Form
router.get("/registration", formRegistration.fetchRegistrations);


module.exports = router;
