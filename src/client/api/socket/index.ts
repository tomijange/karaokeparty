import SocketIO from 'socket.io-client'
import { BACKEND_URL } from '../backend';


const socket = SocketIO.io(BACKEND_URL, {
  transports: ['websocket'],
  path: '/api/socket.io'
});

export default socket;
