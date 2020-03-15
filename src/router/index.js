import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home";

Vue.use(VueRouter)

const video = () => import('../components/Video')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Accueil"
    }
  },
  {
    path: '/videos',
    name: 'Video',
    component: video,
    meta: {
      title: "Vidéos"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
