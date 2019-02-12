import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  //add new message function to pass to ChatBar
  render() {
    return (
      <div className='mainDiv'>
      <header>
      <h1>Chatty</h1>
      </header>
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;
