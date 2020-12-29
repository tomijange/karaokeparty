import Vue from 'vue'
import store from '@/client/store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const socket = SocketIO.io('http://localhost:3000', { transports: ['websocket'] });



export default socket;