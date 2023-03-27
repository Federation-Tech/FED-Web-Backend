const mongoose =  require('mongoose')

const con = (req,res,next)=>{ 
  mongoose.connect('mongodb://localhost:27017/fed-user') 
    next()}; 

module.exports = con;