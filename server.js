const http = require('http'),
      express = require('express'),
      base_url = process.env.BASE_URL || 'http://localhost:3000',
      app = express(),
      port = process.env.PORT || 3000,
      socketIo = require('socket.io'),
      server = http.createServer(app),
      io = socketIo(server);


if (process.env.REDISTOGO_URL) {
  rtg  = require("url").parse(process.env.REDISTOGO_URL);
  client = require("redis").createClient(rtg.port, rtg.hostname);
  subscribe = require("redis").createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
  subscribe.auth(rtg.auth.split(":")[1]);
} else {
  client = require('redis').createClient();
  subscribe = require('redis').createClient();
}

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(port, function () {
  console.log('Listening on port:', port);
});
