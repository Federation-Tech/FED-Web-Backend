const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.mongoURL);

const connectDB = async (db) => {
  try {
    var url = process.env.mongoURL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    await client.connect();
    console.log("FED-TECH -> Database Connected!!");
  } catch (error) {
    console.log("FED-TECH -> Database connection error 😢");
  }
};

module.exports = connectDB;
module.exports.mongoClient = client;
