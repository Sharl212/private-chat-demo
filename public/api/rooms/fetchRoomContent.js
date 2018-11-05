const roomSchema = require("../../models/room");

function fetchRoom(roomID) {
    return new Promise((resolve, reject) => {
        const MessagesLimitation = -10; // ? requests only the last "x" messages

        roomSchema.findById(roomID, { messages: { $slice:  MessagesLimitation} }).then((response, err) => {
            if(err) reject(err)
            resolve(response) // ? if the room by this id doesnt exist, it says "null"
        })
    })
}

module.exports = fetchRoom;