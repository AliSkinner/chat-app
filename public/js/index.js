var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formattedTime} : ${message.text}`)
  console.log(li);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
 });

$('#message-form').on('submit', function(e) {
  var $messageTextBox = $('[name="message"]');
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: $messageTextBox.val()
  }, function(data) {
    $messageTextBox.val('');
  });
});

var $locationButton = $('#send-location');

$locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }

  $locationButton.attr('disabled', 'disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    $locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location');
    $locationButton.removeAttr('disabled').text('Send Location');
  });
});
