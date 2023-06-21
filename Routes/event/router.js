const express = require("express");
const router = express.Router();
const eventController = require("./../../controllers/events/eventController");
const middleware = require("../../middleware/validator");

//get event
router.get("/getevent", eventController.getEvent);

//validation
router.use(middleware);

//add event
router.post("/addevent", eventController.addEvent);

//edit event
router.patch("/editevent/:id", eventController.editEvent);

//delete event
router.delete("/deleteevent/:id", eventController.deleteEvent);

module.exports = router;
