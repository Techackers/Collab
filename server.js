const express= require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.set('view engine','ejs');

const port = process.env.PORT || 4000;

app.use('/' , require('./routes/chatRoute'));

const server = app.listen(port,() => {
    console.log('Server is running on port', port);
});