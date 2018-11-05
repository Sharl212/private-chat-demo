const moment = require('moment');


let generateMessage = (
  type,
  roomID,
  trade_id,
  message
)=>{
  return{
    type,
    trade_id,
    roomID,
    client_timestamp: moment(), // default to the current date {not formatted yet}
    message
  }
}

// ! "users" here should be an array that contains the 2 users IDs connected
/*
 let users = [{ 
      ID: "123xx",
      name: "ahmed"
    },
    {
      ID: "567x",
      name: "sharl"
    }
  ]
*/
let generateRoomID = (users) =>{
  if(users.length < 2 || typeof users == null || typeof users == undefined) {
    return console.log("oops!")
  }
  
  let roomID = "".concat(users[0].ID, users[1].ID)
  return roomID;
}

module.exports = { generateMessage, generateRoomID };
