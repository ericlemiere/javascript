var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

console.log('**** Server started ****');

SOCKET_LIST = {};

var io = require('socket.io')(server);
io.sockets.on('connection', (socket) => {
    console.log('new user!');
    var socketID = Math.random();
    SOCKET_LIST[socketID] = socket;

    socket.on('sendMsgToServer', (data) => {
        console.log('someone sent a message!');
        for(var i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', data);
        }
    });

    socket.on('disconnect', () => {
        delete SOCKET_LIST[socket.id];
        console.log('Disconnected.');
    });
});

server.listen(4141);