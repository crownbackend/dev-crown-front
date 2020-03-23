import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false
Vue.prototype.$hostName = "https://127.0.0.1:8000/api"
Vue.prototype.$hostImages = "https://127.0.0.1:8000/images"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
