const express =  require('express')
const app =  express()
const cors =  require('cors')
const mongoose =  require('mongoose')
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: false }));

app.use('/user/login', require('./Routes/User/log'))
app.get('*', (req,res)=>{
    console.log("error 404")
})

app.listen(8080,()=>{
    console.log('listening to port .....')
})