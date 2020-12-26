import Vue from 'vue'
import App from './client/App.vue'
import router from './client/router'
import store from './client/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
