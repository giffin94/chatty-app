import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx'
import Notification from './Notification.jsx'

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messages = this.props.messages.map((message) => {
      if (message.type === 'postNotification') {
        return (
          <Notification message={message} key={message.id} />
        )
      } else {
        return (
          <Message message={message} key={message.id} />
        )
      }   
    });
  //creates message with given data. Send to MessageList.jsx to be added to list
    return (
      <div className='messageContainer'>
        {messages}
      </div>
    );
  }
}
// class MessageList extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const messages = this.props.messages.map((message) => {

//       return (
//         <Message message={message}  key={message.id} />
//       )
//     });
//   //creates message with given data. Send to MessageList.jsx to be added to list
//     return (
//       <div className='messageContainer'>
//         {messages}
//       </div>
//     );
//   }
// }

MessageList.propTypes = {
  messages: PropTypes.array,
}

export default MessageList;