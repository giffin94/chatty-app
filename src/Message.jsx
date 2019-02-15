import React from 'react';
import PropTypes from 'prop-types';



function Message(props) {
  //creates message with given data. Send to MessageList.jsx to be added to list
  const message = props.message;
  return (
      <div className='message' >
        <span className='user' style={props.userStyle}>{message.user}</span>
        <span className='msgText'>{message.content}</span>
      </div>
  );
}

Message.propTypes = {
  message: PropTypes.object,
  user: PropTypes.string,
  userStyle: PropTypes.object
}

export default Message;