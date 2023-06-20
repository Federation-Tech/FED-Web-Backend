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
  registration: {
    type: String,
    required: true,
    enum: ["Online", "Offline"],
  },
  month: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("events", events);
