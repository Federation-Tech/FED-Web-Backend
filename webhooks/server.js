const express = require("express");
const app = express();
const crypto = require("crypto")
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use("/push", (req,res)=>{
    res.status(202).send("ok")
    console.log(verifySignature("vinit",req.headers['x-hub-signature-256'],req.body.payload))
});

app.listen(7000, async () => {
  console.log(`FED-TECH -> Server is running on Port`);
});

let encoder = new TextEncoder();

async function verifySignature(secret, header, payload) {
    let sigHex = header;

    let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

    let keyBytes = encoder.encode(secret);
    let extractable = false;
    let key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        [ "sign", "verify" ],
    );

    let sigBytes = hexToBytes(sigHex);
    let dataBytes = encoder.encode(payload);
    let equal = await crypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes,
    );

    return equal;
}

function hexToBytes(hex) {
    let len = hex.length / 2;
    let bytes = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < hex.length; i += 2) {
        let c = hex.slice(i, i + 2);
        let b = parseInt(c, 16);
        bytes[index] = b;
        index += 1;
    }

    return bytes;
}