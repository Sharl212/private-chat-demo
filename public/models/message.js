//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    id: Schema.Types.ObjectId,
    Name: String,
    payload: {}
});


module.exports = mongoose.model('Message', MessageSchema);