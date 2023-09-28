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
app.use(express.json())
app.use(bodyParser.json({
    verify: (req, res, buf, encoding) => {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
      }
    },
  }))
app.post("/push", async(req,res)=>{
    console.log(req.headers)
    console.log(req.body)
    verifyPostData(req,res)
    res.status(202).send("ok")
});

app.listen(7000, async () => {
  console.log(`FED-TECH -> Server is running on Port`);
});

function verifyPostData(req, res) {
    
    if (!req.rawBody) {
      return console.log('Request body empty')
    }
  
    const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
    const hmac = crypto.createHmac(sigHashAlg, secret)
    const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8')
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      return console.log(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
    }
  
    console.log("check")
  }