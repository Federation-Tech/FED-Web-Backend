const express =  require('express')
const router =  express.Router();
const mongoose =  require('mongoose')
const controller =  require('../../controllers/user')
const con = require('../../middleware/connection')
//connection to database 
router.use(con)
//login user
router.post('/login' , controller.login);
module.exports = router