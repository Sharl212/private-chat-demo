//Require Mongoose
const mongoose = require('mongoose');
const MessageSchema = require("./message");
const Message = new MessageSchema();

//Define a schema
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    _id: String,
    messages: []
});


module.exports = mongoose.model('Room', RoomSchema);