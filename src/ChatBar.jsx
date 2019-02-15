import React from 'react';
import PropTypes from 'prop-types';

function ChatBar(props) {
  function onSubmit(event) {
    event.preventDefault();
    const userName = props.currentUser.name;
    const newMsg = event.target.elements.msg.value; 
    if (newMsg) {
      let newMsgObject = {
        type: 'postMessage',
        user: `${userName}`,
        content: `${newMsg}`,
        styleOpts: `${props.currentUser.style.color}`
      }
      props.updateMsg(newMsgObject);
      event.target.elements.msg.value = '';
      event.target.elements.username.value = userName;
    } else {
      alert('You must enter a message!');
    }
  }
  function onNameUpdate(event) {
    let updatedName;
    if(event.keyCode === 13) {
      event.preventDefault();
      updatedName = event.target.value;
      props.updateMsg({type: 'postUserUpdate', name: `${updatedName}`});
    }
  }
  return (
    <footer className='ChatBar'>
      <form onSubmit={onSubmit}>
        <input onKeyDown={onNameUpdate} className='username' name='username' type='text' defaultValue={props.currentUser.name || 'Anonymous'}/>
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