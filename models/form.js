const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formData = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  formelement:{
    type: Array,
    required: true,
  },
  event:{
    type: Schema.Types.ObjectId, 
    ref: 'events',
    required: true
  }
});

module.exports = mongoose.model("form", formData);
