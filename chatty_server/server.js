// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


const messageHandlers = {
  postMessage: (message) => {
    let msgObject = {
      type: 'incomingMessage',
      user: message.user,
      content: message.content,
      styleOpts: { color: `${message.styleOpts}` },
      id: uuid(),
    }
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(msgObject));
    });
  },
  postUserUpdate: (message, wsClient) => {
    let newUserObject = {type: 'incomingUserUpdate', name: message.name}
    wsClient.send(JSON.stringify(newUserObject));
  },
  postNotification: (message) => {
    let newNotification = {
      type: 'incomingNotification',
      content: `${message.oldName} changed their name to ${message.newName}`,
      id: uuid()
    }
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(newNotification));
    });
  }
}

let userCount = {
  count: 0,
  type: 'activeUserUpdate'
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  userCount.count++;
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(userCount))
  });  

  ws.onmessage = function(msg) {
    let message = JSON.parse(msg.data);
    let type = message.type;
    messageHandlers[`${type}`](message, ws);
  };

  ws.on('close', () => {
    console.log('Client disconnected')
    userCount.count--;   
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(userCount))
    });  
  });
});