const messageSchema = require("../../models/message");

function saveMessage(newMessage) {
    return new Promise((resolve, reject) => {
        const message = new messageSchema(newMessage);
        message.save(function (err) {
            if (err) reject(err)
            return resolve(message);
        })
    })
}

module.exports = saveMessage;