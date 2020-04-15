import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home"
import store from "../store/index"
import UserApi from "../services/UserApi"

Vue.use(VueRouter)

const video = () => import('../components/video/Video')
const showVideo = () => import("../components/video/Show")
const article = () => import("../components/blog/Article")
const showArticle = () => import("../components/blog/Show")
const technology = () => import("../components/technology/Technology")
const showTechnology = () => import("../components/technology/Show")
const playlists = () => import("../components/playlist/Playlist")
const playlist = () => import("../components/playlist/Show")
const register = () => import('../components/registration/Register')
const confirmation = () => import('../components/registration/ConfirmationAccount')
const login = () => import('../components/security/Login')
const ForgotYourPassword = () => import("../components/security/ForgotYourPassword")
const ConfirmPassword = () => import('../components/security/ConfirmPassword')
const error404 = () => import("../components/error/Error404")

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Accueil",
      description: "Partez à la découverte du développement web avec un contenu éllaboré pour tous, gratuitement !"
    }
  },
  {
    path: '*',
    name: 'Error404',
    component: error404,
    meta: {
      title: "Erreur 404",
      description: "Erreur 404 page non trouvé !"
    }
  },
  {
    path: '/videos',
    name: 'Video',
    component: video,
    meta: {
      title: "Vidéos",
      description: "Retrouver ici toutes les vidéos de ma chaîne Youtube !"
      // requiresAuth: true,
    }
  },
  {
    path: "/inscription",
    name: "Register",
    component: register,
    meta: {
      title: "Inscription",
      description: "Inscription sur dev-crown.com"
    }
  },
  {
    path: "/mon-compte/confirmation/:token",
    name: "ConfirmationAccount",
    component: confirmation,
    meta: {
      title: "Confirmation de votre inscription",
      description: "Confirmation de votre compte"
    }
  },
  {
    path: "/mon-compte/connexion",
    name: "Login",
    component: login,
    meta: {
      title: "Connexion",
      description: "Connexion à votre compte"
    }
  },
  {
    path: "/mon-compte/mot-de-de-passe-oublier",
    name: "forgotPassword",
    component: ForgotYourPassword,
    meta: {
      title: "Mot de passe oublié",
      description: "Mot de passe oublié"
    }
  },
  {
    path: "/mon-compte/mot-de-de-passe-oublier/verification/:token",
    name:"verifyPassword",
    component: ConfirmPassword,
    meta: {
      title: "Récupération de mot de passe",
      description: "Récupération de votre compte"
    }
  },
  {
    path: "/blog",
    name: "Article",
    component: article,
    meta: {
      title: "Le Blog",
      description: "Retrouver ici tout mes articles !"
    }
  },
  {
    path: "/blog/:slug/:id",
    name: "showArticle",
    component: showArticle
  },
  {
    path: "/videos/:slug/:id",
    name: "videoShow",
    component: showVideo
  },
  {
    path: "/technologies",
    name: "Technology",
    component: technology,
    meta: {
      title: "Technologies",
      description: "Retrouver ici toutes les technologies"
    }
  },
  {
    path: "/technologies/:slug/:id",
    name: "showTechnology",
    component: showTechnology,
  },
  {
    path: "/playlistes",
    name: "Playlist",
    component: playlists,
    meta: {
      title: "Playliste",
      description: "Retrouver ici toutes mes playlistes youtube"
    }
  },
  {
    path: "/playliste/:slug/:id",
    name: "showPlaylist",
    component: playlist
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
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
  document.querySelector('meta[name="description"]').setAttribute("content", to.meta.description);
  next()
})

export default router
