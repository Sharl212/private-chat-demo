import {
    socket
} from './Chat'; // connect to the server
import $ from 'jquery';
import {generateMessage} from "./functionality/Factories";

const resetMessageBox = () => {
    $('input[name="from"]').prop("disabled", true);
    document.querySelector('input[name="msgContent"]').value = ""
}


const sendmsg = (e) => {
    e.preventDefault();

    let message = document.querySelector('input[name="msgContent"]').value,
        roomID = document.querySelector('#id').value
console.log(roomID)
    socket.emit('createMessage', generateMessage("message", roomID, "xxxxxx", message));
    
    resetMessageBox();
};

export {
    sendmsg
};