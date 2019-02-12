import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
  //creates message with given data. Send to MessageList.jsx to be added to list
    return (
      <div className='messageContainer'>
        <Message />
      </div>
    );
  }
}

export default MessageList;