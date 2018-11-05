const saveMessage = require("./saveMessage");
const findRoomByIdAndUpdate = require("../rooms/findRoomByIdAndUpdate");

const {
    generateMessage
} = require("../../Factories");

async function newMessage(payload, roomID) {
    return new Promise(async (resolve, reject) => {
        console.log(payload, roomID)
        const newMessage = {
            Name: payload.name,
            payload: generateMessage("message", payload.trade_id, payload.message)
        }
        const savedMessage = await saveMessage(newMessage);
        const MessageID = savedMessage._id

        return await findRoomByIdAndUpdate(roomID, MessageID).then(response => {
            if (response == 0 || response == 1) // ?  the room was created, the message was added to it
            {
                return resolve(savedMessage)
            }
        }).catch(err => reject(err));
    })
}


module.exports = newMessage;