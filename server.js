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
app.use("*", (req, res) => {
  res.status(404);
  res.send("404 not found");
  console.log("error 404");
});

app.listen(8080, () => {
  console.log("listening to port .....");
});
