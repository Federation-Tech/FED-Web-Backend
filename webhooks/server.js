const express = require("express");
const app = express();
const secret = "vinit";
const shDir = "/root/beta/FED-Web-Backend/webhooks/gitpull.sh"
const mainDir = "/root/FED-Web-Backend";
const mainBranch = "main";
const betaDir = "/root/beta/FED-Web-Backend";
const betaBranch = "beta";
var cp = require('child_process');



var githubMiddleware = require("github-webhook-middleware")({
  secret: secret,
});
const { exec } = require("child_process");
app.post("/push", githubMiddleware, async (req, res) => {
  console.log("Branch Called ",req.body.ref.split("/")[2])
  if (req.body.repository.name == "FED-Web-Backend") {
    var branch = req.body.ref.split("/")[2];
    if (branch == mainBranch) {
      var temp = cp.spawn(`sh`,[shDir,mainDir,mainBranch]);
      temp.stdout.on('data',(data)=>{
        console.log("out:",data)
      })
      // var yourscript = exec(
      //   `sh ${shDir} "${mainDir}" ${mainBranch}`,
      //   (error, stdout, stderr) => {
      //     console.log(stdout);
      //     console.log(stderr);
      //     if (error !== null) {
      //       console.log(`exec error: ${error}`);
      //     }
      //   }
      // );
    }

    if (branch == betaBranch) {
      // var yourscript = exec(
      //   `sh ${shDir} "${betaDir}" ${betaBranch}`,
      //   (error, stdout, stderr) => {
      //     console.log(stdout);
      //     console.log(stderr);
      //     if (error !== null) {
      //       console.log(`exec error: ${error}`);
      //     }
      //   }
      // );
      var temp = cp.spawn(`sh`,[shDir,betaDir,betaBranch]);
      temp.stdout.on('data',(data)=>{
        console.log("out:",data)
      })
    }
  }
  res.status(202).send("ok");
});
//test commit
app.listen(7000, async () => {
  console.log(`FED-TECH -> Githook Server is running on Port 7000`);
});
