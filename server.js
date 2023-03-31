const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const verfication = require("./controllers/user/verification");
app.use(cors());

app.use(express.json());

// app.use(express.urlencoded({ extended: false }));
mongoose.connect("mongodb://localhost:27017/fed-user");
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
