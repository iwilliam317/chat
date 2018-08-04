const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (request, response) => {
  response.render('index.html');
});

let messages = [];

io.on('connection', socket => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receiveMessage', data);
    // console.log(data.author, data.message);
  });
})
server.listen(3000);