import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: { name: 'Anonymous'},
      messages: [],
      activeUsers: 0,
    }
    this.socket = new WebSocket('ws://localhost:3001');
    this.newMessage = this.newMessage.bind(this);
  }
  
  componentDidMount() {
    let newMessage = {};

    this.socket.onopen = () => {
      console.log('connected to websocket!');
    }
    this.socket.onmessage = (message) => {
      newMessage = JSON.parse(message.data);
      let previousUser = this.state.currentUser.name;
      let previousMessages = this.state.messages;

      const incomingData = {
        incomingMessage: (data) => {
          return({messages: [...previousMessages, data]});
        },
        incomingUserUpdate: (data, name) => {
          let updateNotification;
          if (data.name !== name) {
            updateNotification = {
              type: 'postNotification',
              newName: data.name,
              oldName: name
            }
            this.newMessage(updateNotification);
          }
          return {currentUser: {name: `${data.name}`}};
        },
        incomingNotification: (data) => {
          return {messages: [...previousMessages, data]};
        },
        activeUserUpdate: (data) => {
          console.log(data.count);
          return {activeUsers: data.count}
        }
      }
      this.setState(incomingData[`${newMessage.type}`](newMessage, previousUser));
    }
  }

  newMessage(newMsg) {
    this.socket.send(JSON.stringify(newMsg));
  }
  render() {
    return (
      <div className='mainDiv'>
      <header>
      <h1>Chatty</h1>
      <span className='userCount'>{this.state.activeUsers} users currently active.</span>
      </header>
        <MessageList messages={this.state.messages}/>
        <ChatBar updateMsg={this.newMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
