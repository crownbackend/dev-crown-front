<template>
    <div>
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
                                    <p style="float: right" v-if="video.technology">
                                        <a href="">
                                            <img width="100" height="100" v-bind:src="getImageTechnoUrl(video.technology.imageFile)" :alt="video.technology.imageFile">
                                        </a>
                                    </p>
                                    <p v-if="video.playliste">Playliste :
                                        <a href="">
                                            {{video.playliste.name}}
                                        </a>
                                    </p>
                                    <br>
                                    <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                                        <p class="title is-4">
                                            {{video.title}}
                                        </p>
                                    </router-link>>
                                    <p class="subtitle is-6">Dev-crown</p>
                                </div>
                            </div>

                            <div class="content">
                                <p v-html="video.description.slice(0, 80)">
                                    ...
                                </p>
                                <br>
                                <time datetime="2016-1-1">{{video.publishedAt | formatDate}}</time>
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
            <div class="row">
                <div class="col-md-4" v-for="article in articles" v-bind:key="article.id">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <a href="">
                                    <img v-bind:src="getImageUrl(article.imageFile, 'articles')" :alt="article.imageFile">
                                </a>
                            </figure>
                        </div>
                        <br>
                        <time datetime="2016-1-1">{{article.publishedAt | formatDate}}</time>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4 has-text-centered">
                                       {{article.title}}
                                    </p>
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
                           <router-link to="/">
                               {{topic.forum.name}}
                           </router-link>
                       </td>
                       <td>
                           <router-link to="/">
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

    export default {
        name: "Home",
        data() {
            return {
                videos: [],
                articles: [],
                topics: []
            }
        },
        mounted() {
            VideoApi.getLastVideos()
                .then(response => {
                    this.videos = response.data.videos
                })
                .catch(() => {
                    alert('Erreur serveur')
                });
            BlogApi.getLastArticles()
                .then(response => {
                    this.articles = response.data.articles
                })
                .catch(() => {
                    alert('Erreur serveur !')
                })

            ForumApi.getLastTopic()
                .then(response => {
                    this.topics = response.data.topics
                })
            .catch(() => {
                alert('Erreur serveur !')
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
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        },
    }
</script>

<style scoped>
    .notification {
        background-color: #D2D2D2;
    }

    .table {
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    }
</style>