let generateMessage = (
  type,
  client_timestamp,
  trade_id,
  message
) => {
  return {
    type,
    client_timestamp,
    trade_id,
    message
  }
}

let generateRoomID = (ID1, ID2) => { // ? this is supposed to be a complicated algorithm
  // if (users.length < 2 || typeof users == null || typeof users == undefined) {
  // return console.log("oops!")
  // }
  let numID1 = Number(ID1.split("").filter(char => char.match(/[a-zA-Z]/) == null).join(""))

  let numID2 = Number(ID2.split("").filter(char => char.match(/[a-zA-Z]/) == null).join(""))

  return numID1 * numID2
}

// const unEncryptRoomID = (roomID) => {
//   let unEncryptedID = roomID.split("-");
//   return unEncryptedID;
// }

module.exports = {
  generateMessage,
  generateRoomID,
  // unEncryptRoomID
};