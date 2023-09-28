const express = require("express");
const crypto = require('crypto')
const bodyParser = require('body-parser')
const app = express();
const secret = "vinit";

// For these headers, a sigHashAlg of sha1 must be used instead of sha256
// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
const sigHeaderName = 'x-hub-signature-256'
const sigHashAlg = 'sha256'
var githubMiddleware = require('github-webhook-middleware')({
  secret: "vinit"});
app.post("/push",githubMiddleware, async(req,res)=>{
    console.log(req.headers)
    console.log(req.body)
    res.status(202).send("ok")
});

app.listen(7000, async () => {
  console.log(`FED-TECH -> Server is running on Port`);
});



function verifyPostData(req, res) {
    
    if (!req.body) {
      return console.log('Request body empty')
    }
  
    const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
    const hmac = crypto.createHmac(sigHashAlg, secret)
    const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.body).digest('hex'), 'utf8')
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      return console.log(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
    }
  
    console.log("check")
  }