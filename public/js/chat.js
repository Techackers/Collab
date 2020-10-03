var socket = io.connect("http://localhost:4000/");

var userlist = document.getElementById("userlist");
var message = document.getElementById("message");
var sendMessageBtn = document.getElementById("send");
var createRoomBtn = document.getElementById("create-room");
var messages = document.getElementById("msg");
var chatDisplay = document.getElementById("chat-display");

const { username, language, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

console.log(username , language , room);

//Event Listeners
sendMessageBtn.addEventListener("click" , () => {
    socket.emit("sendMessage" , (message.value));
    message.value = "";
});

message.addEventListener("keyup" , function(event) {
    if(event.keyCode == 13) sendMessageBtn.click();
});

socket.on("connect" , () => {
    socket.emit("createUser" , {username , language , room});
});

socket.on('updateChat' , (info , message) => {
    if(info == "INFO") {
        messages.innerHTML += "<p class='alert alert-warning w-100'>" + message + "</p>";
    } 
    else {
      messages.innerHTML += "<p><span><strong>" + info + ": </strong></span>" + message + "</p>";
    }
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

socket.on("updateUsers" , (users , room) => {
    userlist.innerHTML = "";
    for (var user in users) {
        if(users[user][2] == room) {
            userlist.innerHTML += "<li>" + users[user][0] + "</li>";
        }
    }
});