require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const verfication = require("./controllers/user/verification");

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use("/auth", require("./Routes/User/router"));

app.use("/validatetest", verfication.validate, (req, res) => {
  res.send(req.body.user);
});

app.get("/AsUrbqAPHuicUMy3", (req, res) => {
  return res.status(404).send("Hello Server");
});

app.use("*", (req, res) => {
  console.log("error 404");
  return res.status(404).send("404 not found");
});

app.listen(process.env.PORT, () => {
  console.log("listening to port .....");
});
