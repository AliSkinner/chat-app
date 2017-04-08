const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require ('./utils/message')

const publicPath = path.join(__dirname, '/../public');
const app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage(
    'Admin',
    'Welcome to the chat app',
    new Date().getTime()
    )
  );

  socket.broadcast.emit('newMessage', generateMessage(
    'Admin',
    'New user joined group',
    new Date().getTime()
    )
  );

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    callback('This is from the server');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => {
    console.log('client disconnected ');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
