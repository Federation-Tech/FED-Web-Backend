const express = require("express");
const router = express.Router();
const formController = require("../../controllers/form/formController");
const formRegistration = require("../../controllers/form/formRegistration");
const validator = require("../../middleware/validator")
const uploadImage = require("../../middleware/multer")

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
router.get("/getuserformdetails", formController.getuserformdetails);
router.get("/getteamdetails", formRegistration.getTeamDetails);

//toggle Form
router.get("/toggleform", formController.toggleForm);

//add Form
router.post("/addForm", formController.addForm);

//edit Form
router.patch("/updateForm", formController.updateForm);

//delete Form
router.delete("/deleteForm", formController.deleteForm);

//register Form
// router.post("/register", uploadImage.single('image'),formRegistration.register);
router.post("/register",formRegistration.register);

//register Form
router.get("/registration", formRegistration.fetchRegistrations);

//count registrations
router.get("/countRegistrations", formRegistration.totalRegistrations);


module.exports = router;
