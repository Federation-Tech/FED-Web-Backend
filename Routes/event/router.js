const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/events/eventController");
const middleware = require("../../middleware/validator");
const { check } = require("express-validator");

//get event
router.get("/getevent", eventController.getEvent);

//validation
router.use(middleware);

//add event
router.post(
  "/addevent",
  [
    check("title", "title is Required").not().isEmpty(),
    check("date", "date is Required").not().isEmpty(),
    check("image", "image is Required").not().isEmpty(),
    check("description", "description is Required").not().isEmpty(),
    check("registration", "registration is Required").not().isEmpty(),
    check("month", "month is Required").not().isEmpty(),
  ],
  eventController.addEvent
);

//edit event
router.patch(
  "/editevent/:id",
  [
    check("title", "title is Required").not().isEmpty(),
    check("date", "date is Required").not().isEmpty(),
    check("image", "image is Required").not().isEmpty(),
    check("description", "description is Required").not().isEmpty(),
    check("registration", "registration is Required").not().isEmpty(),
    check("month", "month is Required").not().isEmpty(),
  ],
  eventController.editEvent
);

//delete event
router.delete("/deleteevent/:id", eventController.deleteEvent);

module.exports = router;
