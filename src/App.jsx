import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: { name: 'Default'},
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001');
    this.newMessage = this.newMessage.bind(this);
  }
  componentDidMount() {
    let previousState = this.state.messages;
    let newMessage = {};
    let newState = previousState;
    this.socket.onopen = () => {
      console.log('connected to websocket!');
    }
    this.socket.onmessage = (message) => {
      newMessage = JSON.parse(message.data);
      newState = [...previousState, newMessage];
      this.setState({messages: newState});
    }
  }

  newMessage(newMsg) {
    this.socket.send(JSON.stringify(newMsg));
  }
  //add new message function to pass to ChatBar
  render() {
    return (
      <div className='mainDiv'>
      <header>
      <h1>Chatty</h1>
      </header>
        <MessageList messages={this.state.messages}/>
        <ChatBar updateMsg={this.newMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
