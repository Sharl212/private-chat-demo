// ? express server
const express = require('express'),
    app = express(),
    http = require('http')

// ? Io connection setup
const socketiO = require('socket.io'),
    server = http.createServer(app),
    io = socketiO(server);

// ? factories
const {
    generateMessage
} = require('./Factories');

// ? API
const newMessage = require("./api/messages/newMessage");

// ? events
const {
    CREATE_MESSAGE,
    NEW_MESSAGE,
    SUBSCRIBE
} = require("./Events");

// ? the active websocket connection
io.on('connection', socket => {
    console.log("Connected to the client-side")

    function JoinRoom(param) {
        console.log("JoinRoom CALLED!!")
        if (typeof param == "object") {
            console.log("iterating through rooms..")
            for (let chatRoom of param) {
                socket.join(chatRoom.roomID)
            }
        } else {
            socket.join(param)
        }
    }
    socket.on(SUBSCRIBE, JoinRoom)

    socket.on(CREATE_MESSAGE, async payload => {
        console.log(payload)
        const {
            type,
            roomID,
            client_timestamp,
            trade_id,
            message
        } = payload;

        JoinRoom(roomID) // ? join the room incase its a new conversation

        await newMessage(payload, roomID).then(response => { // ? save the new message before sending it to the other side
            io.to(roomID).emit(NEW_MESSAGE, generateMessage(type, client_timestamp, trade_id, message));
        })
    });

    
    socket.emit(NEW_MESSAGE, generateMessage("message", Date.now(), "xxxx-xxxx", "Say hi to each other!"));
});

module.exports = {
    server,
    app,
    express
}