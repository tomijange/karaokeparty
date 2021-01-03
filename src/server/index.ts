import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import http from "http";
import socketIo from 'socket.io';
import onNewConnection from './newConnectionHandler';
import cors from 'cors';
import './songs/fileRepository';
import { router as songsRouter } from './rest/songsRouter';


const app = express();
const httpServer = http.createServer(app);
export const io = new socketIo.Server(httpServer, {
  cors: {
    origin: ["http://localhost:8080", "https://*.tjanke.de"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  path: '/api/socket.io'
});
io.on('connection', onNewConnection)

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.use('/api', songsRouter)

httpServer.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:' + process.env.PORT || 3000 + '💻');
});
