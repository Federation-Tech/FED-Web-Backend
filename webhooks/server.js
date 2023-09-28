const express = require("express");
const app = express();
const crypto = require("crypto")
app.use(express.json())
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
      .createHmac("sha256", "123")
      .update(JSON.stringify(req.body))
      .digest("hex");
    let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    let untrusted =  Buffer.from(req.headers.get("x-hub-signature-256"), 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
  };