import socketIOClient from 'socket.io-client';

import { generateMessage, generateRoomID } from './functionality/Factories';

// const socket = socketIOClient("/");
    
// socket.on('connection', ()=>{
//   console.log('connected to the server');
// })

// socket.on('connect', () =>{
//   console.log(socket)
//   // socket.emit("join", generateRoomID([{ 
//   //     ID: "123xx",
//   //     name: "ahmed"
//   //   },
//   //   {
//   //     ID: "567x",
//   //     name: "sharl"
//   //   }
//   // ]));

//   socket.on('disconnect', ()=> {
//       console.log("disconnected from server!");
//   });
// });