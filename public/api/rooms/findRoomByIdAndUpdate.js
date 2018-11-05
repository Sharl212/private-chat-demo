const newRoom = require("./newRoom");
const roomSchema = require("../../models/room");

function findRoomByIdAndUpdate(roomID, MessageID) {
    return new Promise((resolve, reject) => {
        roomSchema.findByIdAndUpdate(roomID, {
            $push: {
                messages: MessageID
            }
        }, async (err, response) => {
            if(err) reject(err)
            //? couldn't find the room by its Id
            if (response == null) {
                //? created a new room
                if (await newRoom(roomID, MessageID) == "success") {
                    resolve(0) // ? the room was created, the message was added to it
                }
            } else {
                resolve(1) // ? the chat room already existed, the message was added to it
            }
        })
    })
}

module.exports = findRoomByIdAndUpdate;