import React, { Component } from 'react';

import socketIOClient from 'socket.io-client';

import moment from 'moment';

import { sendmsg } from './appForm.js';

import $ from 'jquery';
import './socketConnection.js';

const socket = socketIOClient("/"); // connect to the server

class Chat extends Component {
    constructor(){
    super();

    this.state = {
      messages:[],
      emoji:[],
      roomID: null,
      chosenEmoji: ''
    }

    this.setRoomID = this.setRoomID.bind(this)
    this.getOldMessages = this.getOldMessages.bind(this)
  }

  setRoomID () {
    const roomID = this.props.roomID;

    this.setState({
      roomID
    })
    
    this.getOldMessages(roomID);// ? get old messages for this room, if theres any
  }


  getOldMessages(roomID) {
    fetch(`/api/roomContent/`, {
      method: "POST",
      credentials: "include",
      headers:{
          "Accept": "application/json, text/plain",
          "Content-Type":"application/json"
      },
      body: JSON.stringify({roomID})
    }).then(response =>{
        return response.json()
    }).then(messages =>{
      console.log(messages)
      this.setState({
        messages
      })
    })
  }

  componentDidMount(){
    this.setRoomID(); // ? set RoomID to the hidden input field

    console.log(this.props.roomID)
     socket.on('newMessage', payload =>{
        console.log(payload)
        const formattedDate = moment(payload.client_timestamp).format('hh:mm:ss A'); // format timestamp to {11:20 AM}
        const trade_id = payload.trade_id;
        const message = payload.message; // the message content

        $(function() { // scroll down when a new message is recieved.
          const chatPanel = $('.panel-body');
          const scrollDown = () =>{
            chatPanel.scrollTop(chatPanel.prop('scrollHeight'));
          }
          scrollDown();
        });
      
        this.setState(()=>{
          return {
            messages: this.state.messages.concat({
              trade_id,
              message /* .replace(this.state.emoji, this.state.chosenEmoji)*/,
              client_timestamp: formattedDate}), // connect the old messages to the new one
            emoji: [],
            chosenEmoji: ''
          }
        });
    });
  }

  render() {
    const messages = this.state.messages; // contains whole message array
    const roomID = this.state.roomID; // contains whole message array

    return (
    <div className="container">
      <form onSubmit={sendmsg}>
        <div className="row">
            <div className="col-12">
            <input id="id" value={roomID}/>
                <div className="panel panel-primary">
                    <div className="panel-body">
                        <ul className="chat">
                            {messages.map( payload =>{
                              let key = Math.floor(Math.random()*999)+1; // random number generator for each message element
                              return (
                                <li className="left clearfix" key={key}>
                                  <div className="chat-body clearfix">
                                      <div className="header">
                                          {payload.trade_id}
                                          <strong className="primary-font">{payload.from}</strong> <small className="pull-right text-muted">
                                              <span className="glyphicon glyphicon-time"></span>{payload.client_timestamp}</small>
                                      </div><br/>
                                    <p>{payload.message}</p>
                                </div>
                              </li>
                              )
                            })}
                        </ul>
                    </div>
                    <div className="panel-footer">
                        <div className="input-group">
                            <input id="input" type="text" name='msgContent' className="form-control input-sm" placeholder="Type your message here..." required autoComplete="off" />
                            <span className="input-group-btn">
                                <button className="btn btn-warning btn-sm" id="btn-chat" type='submit'>Send</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </form>
    </div>


    );
  }
}

export default Chat;
export {socket}