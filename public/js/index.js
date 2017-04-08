var socket = io();

socket.on('connect', function () {

  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'thing@test.com',
    text: 'Hello to you, friend!'
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});


socket.on('newMessage', function (message){
  console.log('newMessage', message);
});
