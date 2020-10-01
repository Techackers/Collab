const express= require('express')
const path = require('path')
const app = express()

app.use(express.static('./public'))

app.set('view engine','ejs')

const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port,() =>{
    console.log('Server is running on',port)
})