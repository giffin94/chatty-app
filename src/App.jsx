import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentUser: { name: 'Anonymous'},
      messages: [
        { 
          user: null, 
          content: '', 
          id: 'a1b2' 
        }
      ]
    }
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(newMsg, userInfo) {
    let previousState = this.state;
    let newState = { currentUser: userInfo, messages: [...previousState.messages, newMsg] };
    //notification if username changed
    this.setState(newState);   
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
