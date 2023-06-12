const User = require("../../models/user-model");
const { validationResult } = require("express-validator");
const db = require("./../../models/event");

//add event
const addEvent = async (req, res) => {
  try {
    const { title, date, image, description } = req.body;
    const user = req.body.access;
    console.log(user);
    //validation
    if (req.body.access == 1) {
      if (!title) {
        return res.send({ error: "title is require" });
      }
      if (!date) {
        return res.send({ error: "date is require" });
      }
      if (!image) {
        return res.send({ error: "image is require" });
      }
      if (!description) {
        return res.send({ error: "description is require" });
      }
      const newevent = await new db({
        title,
        date,
        image,
        description,
      }).save();
      res.status(201).send({
        success: true,
        message: "event created successfully",
        newevent,
      });
    } else {
      console.log("Access denied");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create event",
      error,
    });
  }
};

//edit event
const editEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (res.body.access == 0) {
      let getevent;
      try {
        getevent = await db.findById(eventId);
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "Error finding event" });
      }
      let title, date, image, description;
      if (getevent) {
        ({ title, date, image, description } = req.body);
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Event with this id not found" });
      }
      getevent.title = title;
      getevent.date = date;
      getevent.image = image;
      getevent.description = description;
      try {
        await getevent.save();
        res.status(200).json({ success: true });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ success: false, message: "Error saving updated event" });
      }
    } else {
      console.log("Access denied");
    }
  } catch (e) {
    res.status(500).json({ msg: "error" });
    console.log(e);
  }
};

//get event
const getEvent = async (req, res) => {
  try {
    const event = await db.find({});
    res.status(200).send({
      Success: true,
      message: "all event list",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting events",
    });
  }
};

//delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (res.body.access == 0) {
      await db.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "event deleted successfully",
      });
    } else {
      console.log("Access denied");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting event",
      error,
    });
  }
};
exports.addEvent = addEvent;
exports.editEvent = editEvent;
exports.deleteEvent = deleteEvent;
exports.getEvent = getEvent;