import React from 'react';
import PropTypes from 'prop-types';

function randomId() {
  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  var uniqueID = randLetter + Date.now(); //because element IDs need to start with a letter
  return uniqueID;
}

function ChatBar(props) {
  function onSubmit(event) {
    event.preventDefault();
    const userName = event.target.elements.username.value ? event.target.elements.username.value : 'Anonymous';
    const newMsg = event.target.elements.msg.value; 
    if (newMsg) {
      let thisUserObject = {
        name: `${userName}`,
      }
      let newMsgObject = {
        user: `${userName}`,
        content: `${newMsg}`,
        id: randomId(),
      }
      props.updateMsg(newMsgObject, thisUserObject);
      event.target.elements.msg.value = '';
      event.target.elements.username.value = userName;
    } else {
      alert('You must enter a message!');
    }
  }
  return (
    <footer className='ChatBar'>
      <form onSubmit={onSubmit}>
        <input className='username' name='username' type='text' placeholder='Name (Optional)' defaultValue={props.currentUser.name || 'Anonymous'}/>
        <input className='msg' name='msg' type='text' placeholder='Type your message here and press ENTER.'/>
        <input className='hiddenSubmit' type='submit'/>
      </form>
    </footer>
  );
}

ChatBar.propTypes = {
  currentUser: PropTypes.object,
  updateMsg: PropTypes.func
}

export default ChatBar;