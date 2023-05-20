const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const validater = require("./middleware/validator");
const app = express();

require("dotenv").config();

connectDB();

app.use(express.json());

// app.use(
//   cors({
//     credentials: true,
//     origin: "http://127.0.0.1:5173",
//   })
// );

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

// Routes
app.use("/auth", require("./Routes/User/router"));
app.use("/profile", require("./Routes/profile/router"));
app.use("/contact", require("./Routes/contact/router"));

app.use("/oauthplayground", (req, res) => {
  console.log(req.body);
});
app.use("/validatetest", validater.validate, (req, res) => {
  res.send(req.body.user);
});

// Test Route
app.get("/AsUrbqAPHuicUMy3", (req, res) => {
  return res.status(404).send("Hello Server");
});

// Error Page
app.use("*", (req, res) => {
  console.log("error 404");
  return res.status(404).send("404 not found");
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
