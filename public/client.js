var socket = io();

socket.on("connect", function() {
  console.log("You have connected")
});

socket.on("message", function(message) {
  console.log("You received a message: " + message)
});
