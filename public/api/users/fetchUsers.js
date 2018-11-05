const userSchema = require("../../models/users");

function fetchUsers() {
    return new Promise((resolve, reject) => {
        userSchema.find({}).then((users, err) => {
            if(err) resolve(err)
            console.log(users)
            resolve(users)
        })
    })
}

module.exports = fetchUsers;