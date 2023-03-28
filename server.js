const express =  require('express')
const app =  express()
const cors =  require('cors')
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/fed-user') 
app.use('/user', require('./Routes/User/router'))
app.get('*', (req,res)=>{
    console.log("error 404")
})

app.listen(8080,()=>{
    console.log('listening to port .....')
})