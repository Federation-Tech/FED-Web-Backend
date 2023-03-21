const mongoose =  require('mongoose')

const User =  new mongoose.Schema({
    userName:{type : String , required : true , unique : true },
    userpass : { type : String , required : true }
},
{
    collection : 'user-Log-data'
}
)

const model =  mongoose.model('userLogData', User);
module.exports =  model;
