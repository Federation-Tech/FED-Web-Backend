const express = require("express");
const crypto = require('crypto')
const bodyParser = require('body-parser')
const app = express();
const secret = "vinit";

// For these headers, a sigHashAlg of sha1 must be used instead of sha256
// GitHub: X-Hub-Signature
// Gogs:   X-Gogs-Signature
const sigHeaderName = 'X-Hub-Signature'
const sigHashAlg = 'sha1'
app.use(bodyParser.json({
    verify: (req, res, buf, encoding) => {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
      }
    },
  }))
app.post("/push",verifyPostData, async(req,res)=>{
    res.status(202).send("ok")
});

app.listen(7000, async () => {
  console.log(`FED-TECH -> Server is running on Port`);
});

function verifyPostData(req, res, next) {
    
    if (!req.rawBody) {
      return next('Request body empty')
    }
  
    const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
    const hmac = crypto.createHmac(sigHashAlg, secret)
    const digest = Buffer.from(sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'), 'utf8')
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${sig})`)
    }
  
    return next()
  }