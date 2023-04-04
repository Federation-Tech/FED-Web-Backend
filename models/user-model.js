const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  access: { type: String, required: true },
  extradata: { type: Object, required: true }, // array of objects
  isvalid: { type: Boolean, required: true },
  img: { type: String, required: true },
});

module.exports = mongoose.model("userdb", registrationData);
