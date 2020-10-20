<template>
    <div>
        <div class="padding"></div>
        <div class="container">
          <h1 class="title is-1 has-text-centered">Rechercher une ressource sur le site</h1>
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
              <div class="col-md-12" v-if="videos.length !== 0">
                <div style="overflow: scroll; height: 500px">
                  <div class="videoCard" v-for="video in videos" v-bind:key="video.id">
                    <div class="row">
                      <div class="col-md-4">
                        <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                          <img v-bind:src="getImageUrl(video.imageFile, 'videos')" style="width: 400px; height: 200px" :alt="video.imageFile">
                        </router-link>
                      </div>
                      <div class="col-md-8">
                        <Favorie style="float: right" :video-id="video.id" :favored-video="video.favored"/>
                        <div class="title is-2">
                          <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                            {{video.title}}
                          </router-link>
                        </div>
                        <p v-html="video.description.slice(0, 300)">
                        </p>
                        <span style="float: right; padding-top: 50px">
                    <time datetime="2016-1-1">{{video.publishedAt |formatDate}}</time>
                  </span>
                      </div>
                    </div>
                  </div>
                </div>
                <br>
              </div>
              <div v-else class="col-md-12">
                <div class="subtitle is-2">Aucune vidéo</div>
              </div>

              <div class="col-md-12" v-if="articles.length !== 0">
                <hr>
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
              <div v-else class="col-md-12">
                <hr>
                <div class="subtitle is-2">Aucun article</div>
              </div>

              <div class="col-md-12" v-if="topics.length !== 0">
                <hr>
                <div class="has-text-centered">
                  <div class="title is-3">
                    Le Forum
                  </div>
                  <div style="overflow: scroll; height: 500px">
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
              <div v-else class="col-md-12">
                <hr>
                <div class="subtitle is-2">Aucun sujet du forum</div>
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
                this.$buefy.dialog.alert({
                  title: 'Error',
                  message: "Erreur serveur !",
                  type: 'is-danger',
                  hasIcon: true,
                  icon: 'times-circle',
                  iconPack: 'fa',
                  ariaRole: 'alertdialog',
                  ariaModal: true
                })
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
                    this.$buefy.dialog.alert({
                      title: 'Error',
                      message: "Erreur serveur !",
                      type: 'is-danger',
                      hasIcon: true,
                      icon: 'times-circle',
                      iconPack: 'fa',
                      ariaRole: 'alertdialog',
                      ariaModal: true
                    })
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