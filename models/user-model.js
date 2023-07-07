const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationData = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  access: { type: String, required: true },
  extradata: { type: Array, required: true }, // array of objects
  isvalid: { type: Boolean, required: true },
  password: { type: String, required: true },
  img: { type: String, required: true },
  RollNumber: { type: String, required: true },
  School: { type: String, required: true },
  College: { type: String, required: true },
  MobileNo: { type: String, required: true },
  selected: { type: String, required: true },
  linkedin: { type: String, default: "NA" },
  github: { type: String, default: "NA" },
  blur: { type: String, default: "LTF~EiR5%hs,_NIV%MW=pdt7-oX9" },
  regForm: [{ type: Schema.Types.ObjectId, ref: "form", unique: true }],
});
module.exports = mongoose.model("userdb", registrationData);
