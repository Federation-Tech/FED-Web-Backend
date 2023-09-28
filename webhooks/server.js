const express = require("express");
const app = express();
const secret = "vinit";

var githubMiddleware = require('github-webhook-middleware')({
  secret: secret});

app.post("/push",githubMiddleware, async(req,res)=>{
    if(req.body.repository.name == "FED-Web-Backend"){
      console.log((req.body.ref).split("/")[2])
    }
    res.status(202).send("ok")
});


app.listen(7000, async () => {
  console.log(`FED-TECH -> Githook Server is running on Port 7000`);
});