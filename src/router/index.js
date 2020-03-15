import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home";
import store from "../store/index"
import UserApi from "../services/UserApi";

Vue.use(VueRouter)

const video = () => import('../components/Video')
const register = () => import('../components/registration/Register')
const confirmation = () => import('../components/registration/ConfirmationAccount')
const login = () => import('../components/security/Login')
const ForgotYourPassword = () => import("../components/security/ForgotYourPassword")
const ConfirmPassword = () => import('../components/security/ConfirmPassword')

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
      title: "Vidéos",
      // requiresAuth: true,
    }
  },
  {
    path: "/inscription",
    name: "Register",
    component: register,
    meta: {
      title: "Inscription"
    }
  },
  {
    path: "/mon-compte/confirmation/:token",
    name: "ConfirmationAccount",
    component: confirmation,
    meta: {
      title: "Confirmation de votre inscription"
    }
  },
  {
    path: "/mon-compte/connexion",
    name: "Login",
    component: login,
    meta: {
      title: "Connexion"
    }
  },
  {
    path: "/mon-compte/mot-de-de-passe-oublier",
    name: "forgotPassword",
    component: ForgotYourPassword,
    meta: {
      title: "Mot de passe oublié"
    }
  },
  {
    path: "/mon-compte/mot-de-de-passe-oublier/verification/:token",
    name:"verifyPassword",
    component: ConfirmPassword,
    meta: {
      title: "Récupération de mot de passe"
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// check token is valid
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    UserApi.verifyToken()
        .then(response => {
          if(response.status === 500) {
            next('/mon-compte/connexion')
          }

        })
        .catch(err => {
          if(err.response.status === 500) {
            store.dispatch('logout')
            next('/mon-compte/connexion')
          }
        });
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/mon-compte/connexion')
  } else {
    next()
  }
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
