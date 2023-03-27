const mongoose =  require('mongoose')

const User =  new mongoose.Schema({
    userid:{type : String , required : true , unique : true },
    password : { type : String , required : true },
    email : { type : String , required : true , unique : true },
    name : { type : String , required : true },
    rollno : { type : String , required : true , unique : true },
    mobno : { type : Number , required : true },
    mobno2 : { type : Number , required : true },
    source : { type : String , required : true },
    uniname : { type : String , required : true },
    access : { type : String , required : true },
    extradata : { type : String , required : true },
    isvalid : { type : Boolean , required : true },
},
{
    collection : 'user-Log-data'
}
)

const model =  mongoose.model('userLogData', User);
module.exports =  model;
