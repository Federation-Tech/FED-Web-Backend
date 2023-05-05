const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactData = new Schema({
  date: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("contactus", contactData);
