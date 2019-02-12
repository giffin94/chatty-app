import React from 'react';

function ChatBar(/*props*/) {
  function onSubmit(event) {
    event.preventDefault();
    const userName = event.target.elements.username.value ? event.target.elements.username.value :'Anonymous';
    const newMsg = event.target.elements.msg.value; 
    if (newMsg) {
      alert(`${userName}, ${newMsg}`);
      //make a new Message component with data (message.jsx)
    } else {
      alert('You must enter a message!');
    }
  }
  return (<footer className='ChatBar'>
    <form onSubmit={onSubmit}>
      <input className='username' name='username' type='text' placeholder='Name (Optional)'/>
      <input className='msg' name='msg' type='text' placeholder='Type your message here and press ENTER.'/>
      <input className='hiddenSubmit' type='submit' hidefocus='true'/>
    </form>
  </footer>);
}

export default ChatBar;