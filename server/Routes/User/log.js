const express =  require('express')
const router =  express.Router();
const jwt  = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const mongoose =  require('mongoose')
const User = require('../../models/user.model')

require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/fed-user');  

//register user
// router.post('/user/register/',async(req,res)=>{
//     try {
//         const newPass =  await bcrypt.hash(req.body.user.password,10 )
//         const result =  await User.create({
//             userName :  req.body.user.store,
//             userpass : newPass
//         });
//         res.json({status : 'ok'})
//     } catch (error) {
//         res.json({status : 'error', error : 'Duplicate store'})
//     }
// });



//login user
router.get('/user/login' , async(req,res)=>{
    const result = await  User.findOne({
        userName : req.body.email,
    });
    
    if (!result) {return res.json({status : 'error', user : false })};
    const isPasswordValid =  await bcrypt.compare(req.body.password,result.userpass);
    if (isPasswordValid) {
        const token =  jwt.sign({
            userName : result.userName,
        }, process.env.USER_SECRET_KEY)
        res.json({status :'ok', user : token})
    } else{
        res.json({status : 'error' , user : false})
    }
});