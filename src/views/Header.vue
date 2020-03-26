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
                  Technologie
              </b-navbar-item>
              <b-navbar-item href="#">
                  Playliste
              </b-navbar-item>
              <b-navbar-item href="#">
                  Forum
              </b-navbar-item>
          </template>
          <template slot="end">
              <b-navbar-dropdown :label="username" v-if="isLoggedIn">
                  <b-navbar-item href="#">
                      About
                  </b-navbar-item>
                  <b-navbar-item href="#">
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
                        this.$router.push({path: "/"}).catch(() => {

                        })
                    })
            },
        }
    }
</script>