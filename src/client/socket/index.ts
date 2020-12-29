import SocketIO from 'socket.io-client'
import chalk from "chalk";

let origin = window.location.origin;

if (origin !== 'http://localhost:8080') {
  origin = `${origin}/`
} else {
  origin = 'http://localhost:3000/';
}

console.log(`%cbackend url: ${origin}`, 'color: red;');

const socket = SocketIO.io(origin, {
  transports: ['websocket'],
  path: '/api/socket.io'
});

export default socket;
