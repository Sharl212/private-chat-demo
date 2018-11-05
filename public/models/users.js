//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    Name: {
        type: String,
        unique: true
    },
    ChatRooms: [{
        _id:false,
        roomID:{
            type: String
        }
    }]
});


UserSchema.statics.findByCredentials = function (Name) {
    return this.findOne({ Name }).then(function (user) {
        console.log(user)
        if (!user) {
            return Promise.reject();
        } else if(Name == user.Name){
            return Promise.resolve(user);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);