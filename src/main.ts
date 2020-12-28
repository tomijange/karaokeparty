import Vue from 'vue'
import App from './client/App.vue'
import router from './client/router'
import store from './client/store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO.io('https://karaokeparty-backend-tomijange-patch-1-wvu5r2geda-uc.a.run.app/', { transports: ['websocket'] }),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
