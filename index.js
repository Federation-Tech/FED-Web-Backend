
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const validater = require("./middleware/validator");
const app = express();
const fs = require("fs");
const https = require("https");

app.use(express.json({limit :'50mb'}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,OPTIONS"
  );

  next();
});

app.use(cookieParser());
app.use((req, res, next) => {
  var log = {};
  log.time = new Date();
  log.url = req.url;
  log.data = req.body;
  log.header = req.headers.authorization;
  log.queries = req.query;
  log.params = req.params;
  console.log(log);
  next();
});

// Routes
app.use("/auth", require("./Routes/auth/router"));
app.use("/profile", validater, require("./Routes/profile/router"));
app.use("/contact", require("./Routes/contact/router"));
app.use("/member", require("./Routes/member/member"));

// Routes ||  events
app.use("/event", require("./Routes/event/router"));
app.use("/form", require("./Routes/form/router"));

app.use("/oauthplayground", (req, res) => {
  console.log(req.body);
});

// Test Route
app.get("/AsUrbqAPHuicUMy3", (req, res) => {
  return res.status(404).send("Hello Server");
});

app.get("/validatetest", validater, (req, res, next) => {
  res.send("success");
});

// Error Page
app.use("*", (req, res) => {
  console.log("FED-TECH -> Error 404 - Route Not found");
  return res.status(200).send("404 not found");
});

app.listen(process.env.PORT, async () => {
  console.log(`FED-TECH -> Server is running on Port ${process.env.PORT}`);
  await connectDB();
});
