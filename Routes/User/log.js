const express =  require('express')
const router =  express.Router();
const jwt  = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const mongoose =  require('mongoose')
const User = require('../../models/user.model')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/fed-user'); 

//login user
router.post('/' , async(req,res)=>{
   
});
module.exports = router