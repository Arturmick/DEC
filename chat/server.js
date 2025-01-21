const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Nuevo usuairo conectado');
  socket.on('chat', (msg) => {
    socket.broadcast.emit('chat', msg);
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost: ${PORT}`);
});