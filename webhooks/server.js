const express = require("express");
const app = express();
app.use("/push", (req,res)=>{
    console.log(req.body)
    console.log(req.headers)
});

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`FED-TECH -> Server is running on Port ${process.env.PORT}`);
  await connectDB(process.env.database);
});


