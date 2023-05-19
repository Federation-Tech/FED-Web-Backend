const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  altEmail: {
    type: String,
    default: "",
  },
  access: {
    type: String,
    required: true,
  },
  // array of objects
  // extradata: {
  //   type: Array,
  //   required: true,
  // },
  isvalid: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  social: {
    github: {
      type: String,
      default: "",
      required: true,
    },
    linkedin: {
      type: String,
      default: "",
      required: true,
    },
    instagram: {
      type: String,
      default: "",
      required: true,
    },
  },
});

module.exports = mongoose.model("userdb", registrationData);
