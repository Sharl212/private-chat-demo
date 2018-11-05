const userSchema = require("../../models/users");

function addChatRoomID(ID1, ID2, roomID) {
    const ID = [ID1, ID2];
    let n = 1; // ? a variable for recursion
    UpdateRoom(n, ID, roomID);
}

function UpdateRoom(n, ID, roomID) {
    return new Promise((resolve, reject) => {
        userSchema.findByIdAndUpdate(ID[n], {
            $push: {
                ChatRooms: {
                    roomID
                }
            }
        }).then(response => {
            if (n > 0 ) { // ! avoid reaching a negative number
                UpdateRoom(n - 1, ID, roomID);
            }
            resolve(response);
        })
        .catch(err => {
            reject(err);
        })
    })
}


module.exports = addChatRoomID;