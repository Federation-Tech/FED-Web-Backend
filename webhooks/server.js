const express = require("express");
const app = express();
const crypto = require("crypto")
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json({type: 'application/json'}))
app.use("/push", (req,res)=>{
    res.status(202).send("ok")
    console.log(req.headers)
    console.log(req.body)
    console.log(verify_signature(req))
});

app.listen(7000, async () => {
  console.log(`FED-TECH -> Server is running on Port`);
});

const verify_signature = (req) => {
    const signature = crypto
      .createHmac("sha256", "vinit")
      .update(JSON.stringify(req.body))
      .digest("hex");
    let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    let untrusted =  Buffer.from(req.headers["x-hub-signature-256"], 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
  };