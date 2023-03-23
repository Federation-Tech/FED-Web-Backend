const express =  require('express')
const router =  express.Router();
const jwt  = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const mongoose =  require('mongoose')
const User = require('../../models/user.model')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/fed-user');  


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