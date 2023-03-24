const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: Number,
    required: true,
  },
  mobNo: {
    type: Number,
    required: true,
  },
  mobNo2: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  uniName: {
    type: String,
    required: true,
  },
  access: {
    type: Number,
    required: true,
  },
  extraData: {
    type: String,
  },
});

module.exports = mongoose.model("Registration", registrationData);
