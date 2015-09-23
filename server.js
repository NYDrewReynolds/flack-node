const http     = require('http');
const express  = require('express');
const socketIo = require('socket.io');
const app      = express();
const redis    = require('redis');
const client   = redis.createClient();

app.use(express.static('public'));

var server = http.createServer(app);
var port   = process.env.PORT || 8080;

client.subscribe("rock");

client.on("message", function(channel, message) {
  console.log(channel, message)
});

server.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});

const io = socketIo(server);

io.on("connection", function() {
  console.log("A user has connected");
});
