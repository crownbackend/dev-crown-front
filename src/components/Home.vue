<template>
    <div class="container">
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Partez à la découverte du développement web avec un contenu éllaboré pour tous, gratuitement !
            </h1>
        </div>
        <br>
        <div class="has-text-centered">
            <div class="title is-3">
                Les dernières vidéos
            </div>
            <div class="loading-overlay is-active" v-if="loadingVideo">
              <div class="loading-background"></div>
              <span class="icon is-large">
                <i class="fas fa-sync-alt fa-2x fa-spin"></i>
              </span>
            </div>
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
        <br>

        <div class="has-text-centered notification">
            <div class="title is-3">
                Le blog
            </div>
          <div class="loading-overlay is-active" v-if="loadingArticles">
            <div class="loading-background"></div>
            <span class="icon is-large">
                <i class="fas fa-sync-alt fa-2x fa-spin"></i>
              </span>
          </div>
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
        <br>

        <div class="has-text-centered">
            <div class="title is-3">
                Le Forum
            </div>
            <div class="loading-overlay is-active" v-if="loadingTopics">
              <div class="loading-background"></div>
              <span class="icon is-large">
                  <i class="fas fa-sync-alt fa-2x fa-spin"></i>
              </span>
            </div>
            <table class="table">
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
        <br>

    </div>
</template>

<script>
    import VideoApi from "../services/VideoApi";
    import moment from "moment";
    import BlogApi from "../services/BlogApi";
    import ForumApi from "../services/ForumApi";
    import Favorie from "./favorie/Favorie";

    export default {
        name: "Home",
        components: {Favorie},
        data() {
            return {
              videos: [],
              articles: [],
              topics: [],
              loadingVideo: true,
              loadingArticles: true,
              loadingTopics: true
            }
        },
        created() {
            VideoApi.getLastVideos()
                .then(response => {
                    this.loadingVideo = false
                    this.videos = response.data.videos
                })
                .catch(() => {
                  this.loadingVideo = false
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
                });
            BlogApi.getLastArticlesHome()
                .then(response => {
                    this.loadingArticles = false
                    this.articles = response.data.articles
                })
                .catch(() => {
                  this.loadingArticles = false
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

            ForumApi.getLastTopic()
                .then(response => {
                    this.loadingTopics = false
                    this.topics = response.data.topics
                })
            .catch(() => {
              this.loadingTopics = false
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
        },
        methods: {
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

<style scoped>
    .table {
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    }
</style>