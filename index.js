var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

app.use(express.static('public'));

var io = socket(server);
var users = [];

io.on('connection', (socket) => {

    console.log(io.sockets);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    socket.on('enter', function(data){
        users.push({
            'id': socket.id,
            'name': data,
        })
        socket.broadcast.emit('enter', data);
    });

    socket.on('disconnect', function(){
        var userLeft = users.find(function(user) {
            return user.id = socket.id;
        });
        if (userLeft) {
            io.sockets.emit('left', userLeft.name);
        }
    });
});
