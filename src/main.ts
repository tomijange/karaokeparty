import Vue from 'vue'
import App from './client/App.vue'
import socket from './client/api/socket';

import router from './client/router'
import store from './client/store'
import VueSocketIO from 'vue-socket.io'
import resize from "vue-element-resize-detector";
import VueYoutube from 'vue-youtube';


Vue.config.productionTip = false

Vue.use(resize);
Vue.use(VueYoutube);

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
