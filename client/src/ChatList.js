import React, {
    Component
} from 'react';

import cookie from "react-cookies";
import Chat from './Chat';

class ChatList extends Component {
    constructor(){
        super();

        this.state = {
            users:[],
            roomID: null,
            isStartedChatting: false
        };

        this.fetchUsers = this.fetchUsers.bind(this)
        this.startChat = this.startChat.bind(this)
    }

    componentDidMount() {
        this.fetchUsers();
    }

    startChat(ID2) {
        const ID1 = cookie.load("auth");

        fetch("/api/room", {
            method:"POST",
            credentials: "include",
            headers:{
                "Accept": "application/json, text/plain",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ID1, ID2})
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data.roomID)
                this.setState({
                    isStartedChatting: true,
                    roomID: data.roomID
                })
        })
    }

    fetchUsers() {
        fetch("/api/users", {
            method:"get",
            credentials: "include"
        }).then(response =>{
            if(response.ok){
                response.json().then(users =>{
                    this.setState({
                        users
                    })
                })
            }
        })
    }

    render() {
        console.log(this.state.users)
        return(
            this.state.isStartedChatting ? 
            <Chat roomID={this.state.roomID}/>
            :
            <div class="bd-example">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Users list, select one to chat with</th>
                </tr>
              </thead>
              <tbody>
                  {this.state.users.map(user =>{
                      if(user._id !== cookie.load("auth")){
                        return (
                            <tr class="table-success">
                                <th scope="row">{user.Name}</th>
                                <td><button onClick={()=> this.startChat(user._id)}>Start Conversation</button></td>
                            </tr>
                         )
                      }
                  })}
              </tbody>
            </table>
          </div>
        )
    }
}

export default ChatList;