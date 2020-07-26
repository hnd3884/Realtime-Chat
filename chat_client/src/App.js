import React, { Component } from 'react';
import './styles/App.css';
import ChatContainer from './components/ChatContainer/ChatContainer';
import LoginForm from './components/LoginForm/LoginForm'
import * as websocket from 'websocket'
import * as Config from './Config'

const client = new websocket.w3cwebsocket('ws://127.0.0.1:8082');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userDetail: null,
      messHistory: []
    }
  }

  UNSAFE_componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      var messJSON = JSON.parse(message.data);
      //console.log(messJSON);
      if (messJSON.statuscode === Config.LOGIN_CODE_SUCCESS) {
        if (this.state.isLogin === false) {
          this.setState({
            isLogin: true,
            userDetail: messJSON.userDetail,
            messHistory: messJSON.messHistory
          })
        }
      }
      else if (messJSON.statuscode === Config.CHAT_CODE) {
        let currentMess = this.state.messHistory;
        currentMess.push(messJSON.data)
        this.setState({
          messHistory: currentMess
        })
      }
    };
    client.onclose = () => {
      console.log("connection closed");
    }
  }

  Login = (event, username, password) => {
    client.send(JSON.stringify({
      statuscode: Config.LOGIN_CODE,
      username: username,
      password: password
    }));

    event.preventDefault();
  }

  CommitMessage = (message) => {
    client.send(JSON.stringify({
      statuscode: Config.CHAT_CODE,
      userId: this.state.userDetail._id,
      message: message
    }));
  }

  render() {
    return this.state.isLogin ?
      <ChatContainer
        messHistory={this.state.messHistory}
        username={this.state.userDetail.username}
        commitMessage={this.CommitMessage}
      >
      </ChatContainer>
      :
      <LoginForm login={this.Login}></LoginForm>;
  }
}

export default App;
