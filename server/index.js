let express = require('express');
let app = express();

let server = require('http').Server(app)

let io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    },
});

app.use(express.static('client'));

let messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io mmg',
    nickname: 'Bot - kanedaboi_'
}]

app.get('/hola-mundo', function(req, res) {
    res.status(200).send('Hola mundo!');
})

io.on('connection', function(socket){
    console.log(`El cliente con IP ${socket.handshake.address} se ha conectado`);

    socket.emit('messages', messages);

    socket.on('add-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    console.log('Server on');
});