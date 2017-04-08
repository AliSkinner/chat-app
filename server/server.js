const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '/../public');
const app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.emit('newMessage', {
    from: 'test@test.com',
    test: 'Hi, mate!',
    createdAt: 123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    socket.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected ');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
