const express = require("express");
const app = express();
const secret = "vinit";
const mainDir = "/root/FED-Web-Backend"
const mainBranch = "main"
const betaDir = "/root/beta/FED-Web-Backend"
const betaBranch = "beta"

var githubMiddleware = require("github-webhook-middleware")({
  secret: secret,
});
const { exec } = require("child_process");
app.post("/push", githubMiddleware, async (req, res) => {
  if (req.body.repository.name == "FED-Web-Backend") {
    var branch = req.body.ref.split("/")[2];
    if (branch == mainBranch) {
      var yourscript = exec(`sh gitpull.sh "${mainDir} ${mainBranch}"`, (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      });
    }
  }
  res.status(202).send("ok");
});

app.listen(7000, async () => {
  console.log(`FED-TECH -> Githook Server is running on Port 7000`);
});
