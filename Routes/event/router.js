const express = require("express");
const router = express.Router();
const eventController = require("./../../controllers/events/eventController");
const middleware = require("../../middleware/validator");

//add event
router.post("/addevent", middleware.validate, eventController.addEvent);
router.patch("/editevent/:id", middleware.validate, eventController.editEvent);
router.delete(
  "/deleteevent/:id",
  middleware.validate,
  eventController.deleteEvent
);
router.get("/getevent", eventController.getEvent);
module.exports = router;
