require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURL, {
      useNewUrlParser: true,
    });
    console.log("FED-Tech -> Database Connected!!");
  } catch (error) {
    console.log("FED-Tech -> Database connection error 😢");
  }
};

module.exports = connectDB;
