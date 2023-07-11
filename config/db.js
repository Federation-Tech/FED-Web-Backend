require("dotenv").config();
const mongoose = require("mongoose");
const { MongoClient} = require("mongodb");
const client = new MongoClient(process.env.mongoURL);

const connectDB = async (db) => {
  try {
    console.log("DB connection started")
    var url = process.env.mongoURL
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log("moongoose connected")
    await client.connect()
    console.log("moongoClient connected")
    console.log("FED-TECH -> Database Connected!!");
  } catch (error) {
    console.log("FED-TECH -> Database connection error 😢");
  }
};

module.exports = connectDB;
module.exports.mongoClient = client
