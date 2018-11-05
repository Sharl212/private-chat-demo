// ? API
const ifNoRoomCreate = require("../api/rooms/ifNoRoomCreate");
const addChatRoomID = require("../api/rooms/addChatRoomID");

// ? Factories
const {
    generateRoomID
} = require("../Factories");

async function room(req, res) {
    const {
        ID1,
        ID2
    } = req.body
    const roomID = generateRoomID(ID1, ID2);
    const createRoom = await ifNoRoomCreate(roomID)
    const addChatRoom = await addChatRoomID(ID1, ID2, roomID)

    Promise.all([createRoom, addChatRoom]).then(values => {
        return res.status(201).send({
            roomID
        });
    }).catch(err => {
        if (err) return res.status(400).send(err);
    })
}

module.exports = room;