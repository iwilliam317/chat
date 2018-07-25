const app = require('express')();
const path = require('path');

const server = require('http').createServer(app);
const io = require('socket.io')(server);
