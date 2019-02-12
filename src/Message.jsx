import React from 'react';

function Message(/*props*/) {
  //creates message with given data. Send to MessageList.jsx to be added to list
  return (
    <div className='message'>
      <span className='user'>Anonymous</span>
      <span className='msgText'>Some message text here...</span>
    </div>
  );
}

export default Message;