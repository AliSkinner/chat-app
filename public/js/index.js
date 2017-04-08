var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
  console.log('newMessage', message);
  var li = $('<li>' + message.text + '</li>');
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  console.log('hi');
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: $('[name="message"]').val()
  }, function(data) {
    console.log('Got it:', data);
  });
});
