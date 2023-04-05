require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURL, {
      useNewUrlParser: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection error");
  }
};

module.exports = connectDB;
