const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);
const path    = require('path');
const redis   = require('redis');
const client  = redis.createClient(6379, "127.0.0.1");

client.psubscribe("flack:*");

client.on("pmessage", function (pattern, channel, message) {
  console.log(channel, message);
  io.sockets.in(channel).emit("message", message);
});

app.use(express.static('public'));

http.listen(process.env.PORT || 8080, function(){
  console.log('Your server is up and running on Port 8080. Good job!');
});

io.on('connection', function (socket) {
  console.log("Someone has connected.");
  
  socket.on("subscribe", function(room) {
    console.log("subscribed to flack:" + room);
    socket.join("flack:" + room);
  });
});
