import React from 'react';

function ChatBar() {
  function onSubmit(event) {
    event.preventDefault();
    alert('message submitted');
  }
  return (<footer className='ChatBar'>
    <form onSubmit={onSubmit}>
      <input name='username' type='text'/>
      <input name='msg' type='text'/>
      <button type='submit'>Send</button>
    </form>
  </footer>);
}

module.exports = ChatBar;