Chatty-App
=====================

A single page instant messenger.

### Screenshots

!["Have a chat!"](https://github.com/giffin94/chatty-app/blob/master/public/images/Screenshot%20from%202019-02-17%2016-21-27.png?raw=true)

!["unique colors for each user!"](https://github.com/giffin94/chatty-app/blob/master/public/images/Screenshot%20from%202019-02-17%2016-16-33.png?raw=true)


### Usage

Clone the project.

```
git clone git@github.com:giffin94/chatty-app.git
cd chatty-app
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

Start websocket server.

```
cd chatty_server
npm install
node server.js
```


### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Prop-types (React)
* [websocket](https://www.npmjs.com/package/ws)
