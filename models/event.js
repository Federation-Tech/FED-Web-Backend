const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const events = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
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
});
module.exports = mongoose.model("events", events);
