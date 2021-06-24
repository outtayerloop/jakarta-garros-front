import Vue from 'vue'
import vuetify from './plugins/vuetify' // path to vuetify export
import App from './App.vue'
import router from './router/router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  vuetify
})