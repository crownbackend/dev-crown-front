import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import moment from "moment";

Vue.use(Buefy)

Vue.config.productionTip = false
Vue.prototype.$hostName = "https://127.0.0.1:8000/api"
Vue.prototype.$hostImages = "https://127.0.0.1:8000/images"
Vue.prototype.$hostVideos = "https://127.0.0.1:8000/videos/"

moment.locale('fr', {
  months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  relativeTime : {
    future : 'dans %s',
    past : 'il y a %s',
    s : 'quelques secondes',
    m : 'une minute',
    mm : '%d minutes',
    h : 'une heure',
    hh : '%d heures',
    d : 'un jour',
    dd : '%d jours',
    M : 'un mois',
    MM : '%d mois',
    y : 'un an',
    yy : '%d ans'
  }
});
moment.locale('fr');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
