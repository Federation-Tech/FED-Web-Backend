const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

// app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./Routes/User/router"));

app.get("*", (req, res) => {
  console.log("error 404");
});

app.listen(8080, () => {
  console.log("listening to port .....");
});
