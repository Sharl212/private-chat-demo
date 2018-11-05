import React, {
    Component
} from 'react';

// styling
import './libs/Semantic-UI-CSS-master/semantic.css'
import '.././src/form.css';
import './libs/bootstrap/bootstrap.css';
import Chat, { socket } from './Chat';
import ChatList from './ChatList';
import cookie from 'react-cookies';

class App extends Component {
    constructor(){
        super();

        this.state = {
            auth: false
        };

        this.login = this.login.bind(this);
        this.isAuth = this.isAuth.bind(this);
    }

    componentDidMount(){
        this.isAuth();
    }
    isAuth(){ //? super secure
        if(cookie.load("auth")){
            this.setState({
                auth: true
            })
        }
    }

    login(e) {
        e.preventDefault();
        const name = document.querySelector("#name").value
        
        fetch("/api/login", {
            method:"POST",
            credentials: "include",
            headers:{
                "Accept": "application/json, text/plain",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name})
        })
        .then(response =>{
            if(response.ok){
                response.json().then(user =>{
                    socket.emit("subscribe", user.ChatRooms)
                })
                this.setState({
                    auth:true
                })
                console.log('authenticated!!!')
            }
        })
    }


    render() {
        return(
            <div>
                {
                    this.state.auth ?
                    <ChatList/>
                    :
                    <form onSubmit={this.login}>
                       <input type="text" id="name"/>
                       <button type="submit">Login</button>
                    </form>
                }
            </div>
        )
    }
}

export default App;