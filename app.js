var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

var nbConnexions = 0
var nbVotes0 = 0
var nbVotes1 = 0
var nbVotes2 = 0

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    nbConnexions++
    socket.broadcast.emit('connexions', nbConnexions);
    socket.emit('connexions', nbConnexions);
    socket.broadcast.emit('votes0', nbVotes0);
    socket.emit('votes0', nbVotes0);
    socket.broadcast.emit('votes1', nbVotes1);
    socket.emit('votes1', nbVotes1);
    socket.broadcast.emit('votes2', nbVotes2);
    socket.emit('votes2', nbVotes2);

    
    socket.on('plus', function (idClique) {
        if(idClique == 0) {
            console.log('plus ' + idClique);
            nbVotes0++
            socket.broadcast.emit('votes0', nbVotes0);
            socket.emit('votes0', nbVotes0);}
        else if(idClique == 1){
            console.log('plus ' + idClique);
            nbVotes1++
            socket.broadcast.emit('votes1', nbVotes1);
            socket.emit('votes1', nbVotes1);
        }
        else if(idClique == 2){
            console.log('plus ' + idClique);
            nbVotes2++
            socket.broadcast.emit('votes2', nbVotes2);
            socket.emit('votes2', nbVotes2);
        }
    });	

    socket.on('moins', function (idClique) {
        if(idClique == 0) {
            console.log('moins  ' + idClique);
            nbVotes0--
            socket.broadcast.emit('votes0', nbVotes0);
            socket.emit('votes0', nbVotes0);}
        else if(idClique == 1){
            console.log('moins  ' + idClique);
            nbVotes1--
            socket.broadcast.emit('votes1', nbVotes1);
            socket.emit('votes1', nbVotes1);
        }
        else if(idClique == 2){
            console.log('moins ' + idClique);
            nbVotes2--
            socket.broadcast.emit('votes2', nbVotes2);
            socket.emit('votes2', nbVotes2);
        }
    })


    socket.on("disconnect", function(){
        console.log('User disconnected');
        nbConnexions--
        socket.broadcast.emit('connexions', nbConnexions);
        socket.emit('connexions', nbConnexions);
      })
});

server.listen(8080);