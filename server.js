require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const validater = require("./middleware/validator");

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use("/auth", require("./Routes/User/router"));
app.use("/profile", require("./Routes/profile/router"));

app.use("/validatetest", validater.validate, (req, res) => {
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
  console.log(`server started on port ${process.env.PORT}`);
});
