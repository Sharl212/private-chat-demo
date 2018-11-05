const roomSchema = require("../../models/room");

function fetchRoom(roomID) {
    return new Promise((resolve, reject) => {
        roomSchema.findById(roomID).then((response, err) => {
            if(err) reject(err)
            resolve(response) // ? if the room by this id doesnt exist, it says "null"
        })
    })
}

module.exports = fetchRoom;