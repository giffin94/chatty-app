import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = { messages }
  }
  render() {
    return (
      <div className='mainDiv'>
      <header>
      <h1>Chatty</h1>
      </header>
        <Message />
        <ChatBar />
      </div>
    );
  }
}
export default App;
