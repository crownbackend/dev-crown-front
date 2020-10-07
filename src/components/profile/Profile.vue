<template>
    <div v-if="user">
        <div class="container">
          <div class="title is-2 profile">
            Mon profile
          </div>
          <div class="title is-2">
            <router-link :to="{name: 'editProfile', params: {username: user.username}}">
              <i class="fas fa-edit" title="Editer"></i>
            </router-link>
          </div>
          <div class="row">
            <div class="col-md-12">
              <hr>
              <div style="overflow: scroll; height: 500px" v-if="videos.length !== 0">
                <div class="videoCard" v-for="video in videos" v-bind:key="video.id">
                      <div class="row">
                        <div class="col-md-4">
                          <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                            <img v-bind:src="getImageUrl(video.imageFile, 'videos')" style="width: 400px; height: 200px" :alt="video.imageFile">
                          </router-link>
                        </div>
                        <div class="col-md-8">
                          <Favorie style="float: right" :profile="true" :video-id="video.id" :favored-video="video.favored"/>
                          <h1 class="title is-2">
                            <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                              {{video.title}}
                            </router-link>
                          </h1>
                          <p v-html="video.description.slice(0, 300)">
                          </p>
                          <span style="float: right; padding-top: 50px">
                  <time datetime="2016-1-1">{{video.publishedAt |formatDate}}</time>
                </span>
                        </div>
                      </div>
                    </div>
              </div>
              <div v-else>
                <h1 class="title is-2">Aucune vidéo ajouter à vos favories</h1>
              </div>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <table class="table" v-if="topics.length !== 0">
                    <thead>
                    <tr>
                      <th>Résolut</th>
                      <th>Forum</th>
                      <th>Sujet</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="topic in topics" v-bind:key="topic.id">
                      <td v-if="topic.resolve == 1">
                        <i class="fas fa-check-circle"></i>
                      </td>
                      <td v-else>
                        <i class="far fa-circle"></i>
                      </td>
                      <td>
                        <router-link :to="{name: 'showForum', params: {slug: topic.forum.slug, id: topic.forum.id}}">
                          {{topic.forum.name}}
                        </router-link>
                      </td>
                      <td>
                        <router-link :to="{name: 'showTopic', params: {slug: topic.slug, id: topic.id}}">
                          {{topic.title}}
                        </router-link>
                      </td>
                    </tr>
                    </tbody>
                  </table>
              <div v-else>
                <h1 class="title is-2">Aucun sujet créer </h1>
              </div>
              <hr>
            </div>
            <div class="col-md-12">
              <table class="table" v-if="responsesTopic.length !== 0">
                <thead>
                <tr>
                  <th>Résolut</th>
                  <th>Forum</th>
                  <th>Sujet</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="topic in responsesTopic" v-bind:key="topic.id">
                  <td v-if="topic.resolve == 1">
                    <i class="fas fa-check-circle"></i>
                  </td>
                  <td v-else>
                    <i class="far fa-circle"></i>
                  </td>
                  <td>
                    <router-link :to="{name: 'showForum', params: {slug: topic.forum.slug, id: topic.forum.id}}">
                      {{topic.forum.name}}
                    </router-link>
                  </td>
                  <td>
                    <router-link :to="{name: 'showTopic', params: {slug: topic.slug, id: topic.id}}">
                      {{topic.title}}
                    </router-link>
                  </td>
                </tr>
                </tbody>
              </table>
              <div v-else>
                <h1 class="title is-2">Aucune réponse posté sur le forum</h1>
              </div>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <router-link :to="{name: 'imageUpload'}" target="_blank">
                mes images télécharger
              </router-link>
            </div>
          </div>
          <br>
          <button class="button is-fullwidth is-danger" @click="deleteAccount">Supprimer mon compte</button>
        </div>
    </div>
</template>

<script>
import UserApi from "../../services/UserApi";
import moment from "moment";
import Favorie from "@/components/favorie/Favorie";

export default {
  name: "Profile",
  components: {Favorie},
  data() {
    return {
      user: null,
      userId: null,
      topics: [],
      videos: [],
      responsesTopic: []
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId")
    UserApi.verifyProfile(this.$route.params.username)
        .then(response => {
          this.user = response.data
          document.title = this.user.username
          // videos
          UserApi.getVideo(this.userId)
              .then(response => {
                this.videos = response.data.videos
              })
              .catch(() => {
                this.$store.dispatch('logout')
                alert('Erreur serveur veuillez réssayer plus tard')
                this.$router.push({name: "Login"})
              })
          // topics
          UserApi.getTopics(this.userId)
              .then(response => {
                this.topics = response.data.topics
                this.responsesTopic = response.data.topicsResponses
              })
              .catch(() => {
                this.$store.dispatch('logout')
                alert('Erreur serveur veuillez réssayer plus tard')
                this.$router.push({name: "Login"})
              })
        })
        .catch(() => {
          this.$store.dispatch('logout')
          alert('Erreur serveur veuillez réssayer plus tard')
          this.$router.push({name: "Login"})
        })
  },
  methods: {
    getImageUrl(name, docs) {
      return this.$hostImages + "/"+docs+"/" + name;
    },
    deleteAccount() {
      if(confirm("Êtes-vous sûr de supprimer votre compte ? ce ci va supprimer tout vos sujet dans le forum ansi que vos images et videos favorie")) {
        UserApi.deleteAccount(this.userId)
            .then(response => {
              if(response.data.success === 1) {
                this.$store.dispatch('logout')
                alert('Bonne continuation pour la suite !')
                this.$router.push({name: "Home"})
              }
            })
            .catch(() => {
              this.$store.dispatch('logout')
              alert('Erreur serveur veuillez réssayer plus tard')
              this.$router.push({name: "Login"})
            })
      }

    }
  },
  filters: {
    formatDate(value) {
      return moment(value).fromNow()
    }
  }
}
</script>

<style>
    .profile {
        float: left;
        padding-right: 50px;
    }
</style>