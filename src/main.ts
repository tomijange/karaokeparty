import Vue from 'vue'
import App from './client/App.vue'
import socket from './client/socket';

import router from './client/router'
import store from './client/store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import VueKonva from 'vue-konva'

Vue.config.productionTip = false

Vue.use(VueKonva)

Vue.use(new VueSocketIO({
  debug: true,
  connection: socket,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
