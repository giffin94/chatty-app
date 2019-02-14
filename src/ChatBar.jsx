import React from 'react';
import PropTypes from 'prop-types';

function ChatBar(props) {
  function onSubmit(event) {
    event.preventDefault();
    const userName = event.target.elements.username.value ? event.target.elements.username.value : 'Anonymous';
    const newMsg = event.target.elements.msg.value; 
    if (newMsg) {
      let newMsgObject = {
        user: `${userName}`,
        content: `${newMsg}`
      }
      props.updateMsg(newMsgObject);
      event.target.elements.msg.value = '';
    } else {
      alert('You must enter a message!');
    }
  }
  function onNameUpdate(event) {
    let updatedName;
    if(event.keyCode === 13) {
      event.preventDefault();
      updatedName = event.target.value;
      props.updateMsg({name: `${updatedName}`});
    }
  }
  return (
    <footer className='ChatBar'>
      <form onSubmit={onSubmit}>
        <input onKeyDown={onNameUpdate} className='username' name='username' type='text' placeholder='Name (Optional)' defaultValue={props.currentUser.name || 'Anonymous'}/>
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