const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  access: { type: String, required: true },
  extradata: { type: Array, required: true }, // array of objects
  isvalid: { type: Boolean, required: true },
  password: { type: String, required: true },
  img: { type: String, required: true },
});

module.exports = mongoose.model("userdb", registrationData);
