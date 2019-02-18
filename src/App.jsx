import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const colors = {
  A : '#FF5733',
  B : '#2AB91F',
  C : '#B0DC2C',
  D : '#FF0000',
  E : '#00C898',
  F : '#C77728',
  G : '#DC1DA6',
  H : '#624BE0',
  I : '#007727',
  J : '#3384D3',
  K : '#3d3d3f',
  L : '#BB33D3',
  M : '#E77803',
  N : '#bd8c7d',
  O : '#03E7D4',
  P : '#67CE0B',
  Q : '#fa625f',
  R : '#E703D7',
  S : '#600473',
  T : '#7acfd6',
  U : '#7A9D96',
  V : '#FF5A09',
  W : '#4ABDAC',
  X : '#262626',
  Y : '#4cb69f',
  Z : '#201d3a'
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
      <section className='mainBlock'>
      <header>
      <h1>Chatty</h1>
      <div className='userCount'>Active users: {this.state.activeUsers}</div>
      </header>
       {this.state.messages.length > 0 &&  <MessageList messages={this.state.messages} />}
        <ChatBar updateMsg={this.newMessage} currentUser={this.state.currentUser}/>
      </section>
    );
  }
}

export default App;
