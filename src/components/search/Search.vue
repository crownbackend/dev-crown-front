<template>
    <div>
        <div class="padding"></div>
        <div class="container">
          <div class="subtitle is-4 has-text-centered">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" v-model="search" placeholder="Rechercher" @keyup="searchBar()">
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
          <div v-if="resultSearch">
          <div class="row">
            <div class="col-md-12">
              <h1 class="title is-1 has-text-centered">
                videos
              </h1>
              <div class="row">
                <div class="col-md-4" v-for="video in videos" v-bind:key="video.id">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                          <img v-bind:src="getImageUrl(video.imageFile, 'videos')" :alt="video.imageFile">
                        </router-link>
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="media">
                        <div class="media-content">
                          <router-link :to="{ name: 'showTechnology', params: {slug: video.technology.slug, id: video.technology.id}}" v-if="video.technology">
                            <figure style="float: right" v-if="video.technology">
                              <img width="100" height="100" v-bind:src="getImageTechnoUrl(video.technology.imageFile)" :alt="video.technology.imageFile">
                            </figure>
                          </router-link>
                          <Favorie :video-id="video.id" :favored-video="video.favored"/>
                          <div v-if="video.playliste">Playliste :
                            <router-link :to="{ name: 'showPlaylist', params: {slug: video.playliste.slug, id: video.playliste.id}}">
                              {{video.playliste.name}}
                            </router-link>
                          </div>
                          <br>
                          <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                            <p class="title is-4">
                              {{video.title}}
                            </p>
                          </router-link>
                        </div>
                      </div>

                      <div class="content">
                        <p v-html="video.description.slice(0, 100)">
                        </p>
                        <br>
                        <time datetime="2016-1-1">{{video.publishedAt |formatDate}}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <h1 class="title is-1 has-text-centered">
                blog
              </h1>
              <div class="row">
                <div class="col-md-4" v-for="article in articles" v-bind:key="article.id">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <router-link :to="{ name: 'showArticle', params: {slug: article.slug, id: article.id}}">
                          <img v-bind:src="getImageUrl(article.imageFile, 'articles')" :alt="article.imageFile">
                        </router-link>
                      </figure>
                    </div>
                    <br>
                    <time datetime="2016-1-1">{{article.publishedAt |formatDate}}</time>
                    <div class="card-content">
                      <div class="media">
                        <div class="media-content">
                          <router-link :to="{ name: 'showArticle', params: {slug: article.slug, id: article.id}}">
                            <p class="title is-4">
                              {{article.title}}
                            </p>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="has-text-centered">
                <div class="title is-3">
                  Le Forum
                </div>
                <table class="table" v-if="topics">
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
              </div>
            </div>
          </div>
          </div>
        </div>
    </div>
</template>

<script>
    import SearchApi from "@/services/SearchApi";
    import moment from "moment";
    import Favorie from "@/components/favorie/Favorie";

    export default {
        name: "search",
      components: {Favorie},
      data() {
            return {
              search: null,
              videos: null,
              articles: null,
              topics: null,
              resultSearch: false
            }
        },
      mounted() {
        let s =this.$route.query.q
        if(s) {
          this.search = s
          SearchApi.search(s)
              .then(response => {
                this.resultSearch = true
                this.videos = response.data.videos
                this.articles = response.data.articles
                this.topics = response.data.topics
              })
              .catch(() => {
                alert("Erreur serveur")
              })
        }
      },
      methods: {
          searchBar() {
            this.$router.push({path: "search", query: {q: this.search.split(' ').join('_')}}).catch(() => {})
            if(this.search.trim()) {
              SearchApi.search(this.search)
                  .then(response => {
                    this.resultSearch = true
                    this.videos = response.data.videos
                    this.articles = response.data.articles
                    this.topics = response.data.topics
                  })
                  .catch(() => {
                    alert("Erreur serveur")
                  })
            }
          },
        getImageUrl(name, docs) {
          return this.$hostImages + "/"+docs+"/" + name;
        },
        getImageTechnoUrl(name) {
          return this.$hostImages + "/technology/" + name;
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
    .padding {
        padding-top: 50px;
    }
</style>