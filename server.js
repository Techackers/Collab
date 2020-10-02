const express= require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.use(express.static('./public'));

app.set('view engine','ejs');

const port = process.env.PORT || 4000;

app.get('/' , (req , res) => res.render('index'));

app.post('/' , (req , res) => {
    console.log(req.body);
    res.render('chat');
});

server.listen(port,() =>{
    console.log('Server is running on port', port);
});