const express = require("express");
const app = express();
app.use("/push", (req,res)=>{
    console.log(req.body)
    console.log(req.headers)
});

app.listen(7000, async () => {
  console.log(`FED-TECH -> Server is running on Port`);
});


