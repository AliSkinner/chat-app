var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
  console.log('newMessage', message);
  var li = $(`<li>${message.text}</li>`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');
  li.text = `${message.from}`;
  a.attr('href', message.url);
  li.append(a);
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

var $locationButton = $('#send-location');

$locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location');
  });
});
