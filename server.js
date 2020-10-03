const express= require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const socket = require('socket.io');
const { userJoin , getCurrentUser , userLeave, getRoomUsers } = require('./utils/users');

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.set('view engine','ejs');

const port = process.env.PORT || 4000;

app.get('/' , (req , res) => res.render('index'));
app.get('/chatRoom' , (req , res) => res.render('chat'));

const server = app.listen(port,() => {
    console.log('Server is running on port', port);
});

const io = socket(server);

const users = {};
const rooms = [];

function createRoom(room) {
    const index = rooms.indexOf(room);
    if(index == -1) rooms.push(room);
}

io.on('connection' , (socket) => {
    console.log('New User Entered' , socket.id);
    socket.on('createUser' , (data) => {
        const {username , language , room} = data;
        createRoom(room);
        const user = [username , language , room];
        const id = socket.id;
        users[id] = user;
        socket.join(room);
        socket.emit("updateChat" , "INFO" , "You have joined room: " + room);
        socket
            .to(users[socket.id][2])
            .broadcast.emit("updateChat" , "INFO" , users[socket.id][0] + " has joined the chat.");
    });

    socket.on('sendMessage' , (message) => {
        io.to(users[socket.id][2]).emit('updateChat' , users[socket.id][0] , message);
    })
})