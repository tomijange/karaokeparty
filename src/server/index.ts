import express from "express";
import http from "http";
import socketIo from 'socket.io';
import onNewConnection from './newConnectionHandler';

const app = express();
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer);

io.on('connection', onNewConnection)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});
