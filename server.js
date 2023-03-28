const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

// app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/fed-user') 
<<<<<<< Updated upstream
app.use("/user", require("./Routes/User/router"));
=======
app.use('/user', require('./Routes/User/router'))

app.get('/test',(req,res)=>{
    console.log("test page");
})
app.get('*', (req,res)=>{
    console.log("error 404")
})
>>>>>>> Stashed changes

app.get("*", (req, res) => {
  console.log("error 404");
});

app.listen(8080, () => {
  console.log("listening to port .....");
});
