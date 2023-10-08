const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const events = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("events", events);
