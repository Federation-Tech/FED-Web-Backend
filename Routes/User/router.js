const express =  require('express')
const router =  express.Router();
const mongoose =  require('mongoose')
const controller =  require('../../controllers/user')

//login user
router.post('/login' , controller.login);
module.exports = router