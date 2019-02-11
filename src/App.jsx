import React, {Component} from 'react';
const ChatBar = require('./ChatBar.jsx');

class App extends Component {
  render() {
    return (<body>
        <h1>Chat my app</h1>
        <ChatBar />
      </body>
    );
  }
}
export default App;
