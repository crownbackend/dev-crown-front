import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import moment from "moment";
import axios from "axios";
import VueHighlightJS from 'vue-highlightjs'
import VuePellEditor from 'vue-pell-editor'
import VueSocialSharing from 'vue-social-sharing'
import VueAnalytics from 'vue-analytics'

Vue.use(VueSocialSharing);
Vue.use(VuePellEditor)
Vue.use(Buefy)
Vue.use(VueHighlightJS)
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTICS,
  router
})

if(localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
}
Vue.config.productionTip = false
// variable global api
Vue.prototype.$hostName = process.env.VUE_APP_HOSTNAME
Vue.prototype.$hostImages = process.env.VUE_APP_HOSTIMAGE
Vue.prototype.$hostVideos = process.env.VUE_APP_VIDEOS
Vue.prototype.$hostFront = process.env.VUE_APP_HOST_FRONT

// moment config show time
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
