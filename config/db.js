require("dotenv").config();
const mongoose = require("mongoose");
const { MongoClient} = require("mongodb");
const client = new MongoClient(process.env.mongoURL);

const connectDB = async (db) => {
  try {
    console.log("DB connection started")
    var url = process.env.mongoURL
    var finalurl = url.slice(0,url.lastIndexOf("/")+1)+db+url.slice(url.lastIndexOf("/")+1)
    await mongoose.connect(finalurl, {
      useNewUrlParser: true,
    });
    console.log("FED-TECH -> Database Connected!!");
  } catch (error) {
    console.log("FED-TECH -> Database connection error 😢");
  }
  console.log("moongoose connected")
  await client.connect()
  console.log("moongoClient connected")
};

module.exports = connectDB;
module.exports.mongoClient = client
