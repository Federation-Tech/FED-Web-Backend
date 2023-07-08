const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const validater = require("./middleware/validator");
const app = express();
const cors = require("cors");

require("dotenv").config();

connectDB();


app.use(cors());
app.use(express.json());

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
app.use("/auth", require("./Routes/auth/router"));
app.use("/profile", validater, require("./Routes/profile/router"));
app.use("/contact", require("./Routes/contact/router"));
app.use("/member",validater, require("./Routes/member/member"));

// Routes ||  events
app.use("/event", require("./Routes/event/router"));
app.use("/form", validater, require("./Routes/form/router"));

app.use("/oauthplayground", (req, res) => {
  console.log(req.body);
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
  console.log(`FED-TECH -> Server is running on Port ${process.env.PORT}`);
});
