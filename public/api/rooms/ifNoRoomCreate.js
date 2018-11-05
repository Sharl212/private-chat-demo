const fetchRoom = require("./fetchRoom");
const newRoom = require("./newRoom");
const defaultMessageID = "5be087b0e7179a5061b7c661";

function ifNoRoomCreate(roomID) {
    return new Promise((resolve, reject) => {
        fetchRoom(roomID).then(async RoomMessages => {
            if (RoomMessages == null) { // ? the room doesnt exist
                await newRoom(roomID, defaultMessageID).then(creation => {
                    if (creation == "success") return resolve(creation)
                })
            } else {
                return resolve(RoomMessages)
            }
        })
    })
}

module.exports = ifNoRoomCreate;