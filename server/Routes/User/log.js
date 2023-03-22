const express =  require('express')
const router =  express.Router();
const jwt  = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const mongoose =  require('mongoose')
const User = require('../../models/user.model')
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/fed-user');  
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
router.use(sessions({
    secret: process.env.session_key ,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//cookie middleware
router.use(cookieParser());

//login user
router.post('/' , async(req,res)=>{
    const result = await  User.findOne({
        userName : req.body.email,
    });
    
    if (!result) {return res.json({status : 'error', user : false })};
    if (req.body.password===result.userpass) {
        const token =  jwt.sign({
            userName : result.userName,
        }, process.env.USER_SECRET_KEY)
        res.json({status :'ok', user : token})
    } else{
        res.json({status : 'error' , user : false})
    }
});

module.exports = router