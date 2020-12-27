import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import http from "http";
import socketIo from 'socket.io';
import onNewConnection from './newConnectionHandler';
import cors from 'cors';


const app = express();
const httpServer = http.createServer(app);
export const io = new socketIo.Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true,
  }
});
io.on('connection', onNewConnection)

app.use(cors());


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

httpServer.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:' + process.env.PORT + '💻');
});
