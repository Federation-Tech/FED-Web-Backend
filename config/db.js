require("dotenv").config();
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.mongoURL);

const connectDB = async (db) => {
  try {
    var url = process.env.mongoURL;

    var finalurl =
      url.slice(0, url.lastIndexOf("/") + 1) +
      db +
      url.slice(url.lastIndexOf("/") + 1);
    await mongoose.connect(finalurl, {
      useNewUrlParser: true,
    });

    try {
      await client.connect();
      console.log("FED-TECH -> Database Connected!!");
    } catch (err) {
      console.log("FED-TECH -> Database connection error 😢");
    }
  } catch (error) {
    console.log("FED-TECH -> Database connection error 😢");
  }
};

module.exports = connectDB;
module.exports.mongoClient = client;
