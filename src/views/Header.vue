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
              <b-navbar-item href="#">
                  Blog
              </b-navbar-item>
              <b-navbar-item href="#">
                  Technologie
              </b-navbar-item>
              <b-navbar-item href="#">
                  Forum
              </b-navbar-item>
          </template>

          <template slot="end">
              <b-navbar-item tag="div">
                  <div class="buttons">
                      <a class="button is-dark">
                          <strong>Inscription</strong>
                      </a>
                      <a class="button">
                          Connexion
                      </a>
                  </div>
              </b-navbar-item>
          </template>
      </b-navbar>
  </div>
</template>