const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app)

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.static('client'));
app.use(cors());

// Routes
app.get('/hola-mundo', (req, res) => {
    res.status(200).json({message: 'Hola mundo!'});
})

async function init(){
    await server.listen(app.get('port'), ()  => {
        console.log(`Server on http://localhost:${app.get('port')}`);
    });
}

init();

const messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io mmg',
    nickname: 'Bot - kanedaboi_'
}]

const io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    },
});

io.on('connection', (socket) => {
    console.log(`El cliente con IP ${socket.handshake.address} se ha conectado`);

    socket.emit('messages', messages);

    socket.on('add-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})