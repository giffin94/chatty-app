import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messages = this.props.messages.map((message) => {
      return (
        <Message message={message}  key={message.id} />
      )
    });
  //creates message with given data. Send to MessageList.jsx to be added to list
    return (
      <div className='messageContainer'>
        {messages}
      </div>
    );
  }
}

export default MessageList;