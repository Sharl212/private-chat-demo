const fetchRoomContent = require("../api/rooms/fetchRoomContent");
const fetchMessages = require("../api/messages/fetchMessages")

async function roomContent (req, res) {
    const roomID = req.body.roomID;

    await fetchRoomContent(roomID).then(async roomData => {
        const messages = roomData.messages; // ? array that contains messages objects
        const n = messages.length - 1; // ? recursion variable
        const messageList = []; // ? to collect the "messages list"
console.log(roomData)
        await fetchMessages(n, messages, messageList).then(list =>{
            console.log(list)
                res.status(302).send(messageList)
        })
        .catch(err => res.status(400).send(err))
    })
}

module.exports = roomContent;