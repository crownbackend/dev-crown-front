<template>
  <div>
      <b-navbar>
          <template slot="brand">
              <router-link to="/">
                  <img
                          src="../assets/logo.png"
                          alt="Logo dev-crown.com"
                          width="90"
                          height="140"
                  >
              </router-link>
          </template>
          <template slot="start">
              <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
                  Accueil
              </b-navbar-item>
              <b-navbar-item tag="router-link" :to="{ name: 'Video' }">
                  Vidéos
              </b-navbar-item>
              <b-navbar-item tag="router-link" :to="{ name: 'Article' }">
                  Blog
              </b-navbar-item>
              <b-navbar-item tag="router-link" :to="{ name: 'Technology' }">
                  Technologies
              </b-navbar-item>
              <b-navbar-item tag="router-link" :to="{ name: 'Playlist' }">
                  Playlists
              </b-navbar-item>
              <b-navbar-item tag="router-link" :to="{ name: 'forum' }">
                  Forum
              </b-navbar-item>
              <b-navbar-item title="Rechercher" tag="router-link" :to="{ name: 'search' }">
                <i class="fas fa-search fa-2x"></i>
              </b-navbar-item>
          </template>
          <template slot="end">
              <b-navbar-dropdown :label="username" v-if="isLoggedIn">
                  <b-navbar-item href="#" v-if="username">
                      <router-link :to="{name: 'profile', params: {username: username}}">
                        Mon profil
                      </router-link>
                  </b-navbar-item>
                  <b-navbar-item tag="router-link" :to="{ name: 'contact' }">
                      Contact
                  </b-navbar-item>
                  <b-navbar-item @click="logout">
                      Se déconnecter
                  </b-navbar-item>
              </b-navbar-dropdown>
              <b-navbar-item tag="div" v-else>
                  <div class="buttons">
                      <router-link :to="{name: 'Register'}" class="button is-dark">
                          <strong>Inscription</strong>
                      </router-link>
                      <router-link :to="{name: 'Login'}" class="button">
                          Connexion
                      </router-link>
                  </div>
              </b-navbar-item>
          </template>
      </b-navbar>
  </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                username: null
            }
        },
        mounted() {
            if(localStorage.getItem("user")) {
                this.username = localStorage.getItem("user")
            }
        },
        computed: {
            isLoggedIn(){
                return this.$store.getters.isLoggedIn
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push({path: "/"}).catch(() => {})
                    })
              this.$router.go(this.$router.currentRoute)
            },
        }
    }
</script>

<style scoped>
    .active {
        color: #7957d5 !important;
    }
</style>