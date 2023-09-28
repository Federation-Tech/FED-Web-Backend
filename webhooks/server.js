const express = require("express");
const app = express();
import { verifySecret } from "verify-github-webhook-secret";
app.use("/push", async(req,res)=>{
    console.log(verifySecret(req,"vinit"))
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