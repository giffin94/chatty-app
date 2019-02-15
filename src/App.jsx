import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const colors = {
  A : '#FF5733',
  B : '#2AB91F',
  C : null,
  D : '#FF0000',
  E : null,
  F : '#C77728',
  G : null,
  H : null,
  I : null,
  J : '#3384D3',
  K : null,
  L : '#BB33D3',
  M : '#E77803',
  N : null,
  O : '#03E7D4',
  P : '#67CE0B',
  Q : null,
  R : '#E703D7',
  S : null,
  T : null,
  U : null,
  V : null,
  W : null,
  X : null,
  Y : null,
  Z : null,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: { name: 'Anonymous', style: {color: 'black'} },
      messages: [],
      activeUsers: 0,
    }
    this.socket = new WebSocket('ws://localhost:3001');
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(newMsg) {
    this.socket.send(JSON.stringify(newMsg));
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
          let firstInitial = (data.name.slice('')[0]).toString();
          let color = (colors[firstInitial.toUpperCase()]);
          if (data.name !== name) {
            updateNotification = {
              type: 'postNotification',
              newName: data.name,
              oldName: name,
            }
            this.newMessage(updateNotification);
          }
          return { 
            currentUser: {
              name: `${data.name}`,
              style: {
                color: `${color}`
              } 
            } 
          };
        },
        incomingNotification: (data) => {
          return {messages: [...previousMessages, data]};
        },
        activeUserUpdate: (data) => {
          return {activeUsers: data.count}
        }
      }
      this.setState(incomingData[`${newMessage.type}`](newMessage, previousUser));
    }
  }

  render() {
    return (
      <div className='mainDiv'>
      <header>
      <h1>Chatty</h1>
      <div className='userCount'>{this.state.activeUsers} users currently active.</div>
      </header>
        <MessageList messages={this.state.messages} />
        <ChatBar updateMsg={this.newMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
