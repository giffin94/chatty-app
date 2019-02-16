import React from 'react';
import PropTypes from 'prop-types';



function Message(props) {
  //creates message with given data. Send to MessageList.jsx to be added to list
  const imageTypes = ['.jpg', '.png', '.gif']
  const message = props.message;
  let modifiedContent = message.content;
  let newImageURL = '';
  let endIndex = -1;
  let startIndex = -1;
  for(const ext of imageTypes) {
    let indexCheck = message.content.search(ext);
    if(indexCheck !== -1) {
      endIndex = indexCheck + 4;
    }
  }
  if(endIndex !== -1) {
    let indexCheck = message.content.search('http');
    startIndex = indexCheck;
    newImageURL = message.content.slice(startIndex, endIndex);
    modifiedContent = modifiedContent.split(newImageURL).join('');
  }
  
  const userImage = newImageURL ? ( <img src={newImageURL} className='userimg'></img> ) : null;

  return (
      <div className='message' >
        <span className='user' style={props.userStyle}>{message.user}</span>
        <span className='msgText'>{modifiedContent}</span>
        {userImage}
      </div>
  );
}

Message.propTypes = {
  message: PropTypes.object,
  user: PropTypes.string,
  userStyle: PropTypes.object
}

export default Message;