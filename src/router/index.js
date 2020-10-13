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
const profile = () => import("../components/profile/Profile")
const editProfile = () => import("../components/profile/Edit")
const Search = () => import("../components/search/Search")
const Forum = () => import("../components/forum/Forum")
const showForum = () => import("../components/forum/Show")
const showTopic = () => import("../components/topic/Topic")
const addTopic = () => import("../components/topic/Add")
const editTopic = () => import("../components/topic/Edit")
const imageUpload = () => import("../components/image/Image")
const politique = () => import("../components/confidentialite/Politique")
const contact = () => import("../components/contact/Contact")

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
  },
  {
    path: "/profile/:username",
    name: "profile",
    component: profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile/edit/",
    name: "editProfile",
    component: editProfile,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      title: "Recherche",
      description: "Rechercher sur le site web les ressources qui vous intéresse !"
    }
  },
  {
    path: "/forum",
    name: "forum",
    component: Forum,
    meta: {
      title: "Forum",
      description: "Bienvenu sur le forum !"
    }
  },
  {
    path: "/forum/:slug/:id",
    name: "showForum",
    component: showForum
  },
  {
    path: "/forum/topics/:slug/:id",
    name: "showTopic",
    component: showTopic
  },
  {
    path: "/forums/topics/new",
    name: "addTopic",
    component: addTopic,
    meta: {
      title: "Ajouter un nouveau sujet",
      description: "Ajouter un nouveau sujet sur le forum.",
      requiresAuth: true
    }
  },{
    path: "/forums/topics/edit/:id/:slug",
    name: "editTopic",
    component: editTopic,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/images/upload",
    name: "imageUpload",
    component: imageUpload,
    meta: {
      title: "Telecharger des images pour le forum",
      description: "Télécharger les images pour le forum.",
      requiresAuth: true
    }
  },
  {
    path: "/politique-de-confidentialite",
    name: "politique",
    component: politique,
    meta: {
      title: "Politique de confidentialité",
      description: "Détail de la politique de confidentialité"
    }
  },
  {
    path: "/contact",
    name: "contact",
    component: contact,
    meta: {
      title: "Contact",
      description: "Contacter moi si vous avez une question sur le site !"
    }
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
