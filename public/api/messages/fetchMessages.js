const messageSchema = require("../../models/message");

async function fetchMessages(n, messages, list) {
    console.log(n)
    const query = await messageSchema.findById(messages[n]);
    console.log(messages[n])
    return new Promise((resolve, reject) => {
        if (query.errors) return reject(err);

        if (n >= 0) { // ! avoid reaching a negative number
            list.push(query.payload)
        }
        if (n > 0) {
            resolve(fetchMessages(n - 1, messages, list));
        }

        return resolve(list);
    })
}

module.exports = fetchMessages;