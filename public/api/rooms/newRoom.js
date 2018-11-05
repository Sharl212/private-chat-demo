const roomSchema = require("../../models/room");

function newRoom(roomID, messageID) {
    return new Promise((resolve, reject) => {
        const room = new roomSchema();
        room._id = roomID
        room.messages.push(messageID)

        room.save(err => {
            if (err) return reject(err)
            return resolve("success")
        })
    })
}

module.exports = newRoom;