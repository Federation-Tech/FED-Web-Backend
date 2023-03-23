const express =  require('express')
const router =  express.Router();
const jwt  = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const mongoose =  require('mongoose')
const User = require('../../models/user.model')
// const cookieParser = require('cookie-parser');
// const sessions = require('express-session');
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/fed-user');  
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
// router.use(sessions({
//     secret: process.env.session_key ,
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false
// }));

// //cookie middleware
// router.use(cookieParser());


// let session;


//already logged in


//login user
router.post('/' , async(req,res)=>{
    const result = await  User.findOne({
        userName : req.body.email,
    });
    
    if (!result) {return res.json({status : 'error', user : false })};
    // req.body.password===result.userpass
    if (  req.body.password===result.userpass) {
        const token =  jwt.sign({
            userName : result.userName,
        }, process.env.USER_SECRET_KEY,{ expiresIn: '86400s' })


        // session = req.session;
        // session.userid = token;
        // console.log(req.session)
        res.json({status :'ok', user : token})
    } else{
        res.json({status : 'error' , user : false})
    }
});
router.post('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})
module.exports = router