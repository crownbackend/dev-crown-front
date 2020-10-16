<template>
    <div class="container">
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Retrouver ici toutes les vidéos de ma chaîne Youtube !
            </h1>
        </div>
        <div class="loading-overlay is-active" v-if="loading">
          <div class="loading-background"></div>
          <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
          </span>
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
                                        <img v-bind:src="getImageUrl(video.imageFile)" :alt="video.imageFile">
                                    </router-link>
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p style="float: right" v-if="video.technology">
                                            <router-link :to="{ name: 'showTechnology', params: {slug: video.technology.slug, id: video.technology.id}}">
                                                <img width="100" height="100" v-bind:src="getImageTechnoUrl(video.technology.imageFile)" :alt="video.technology.imageFile">
                                            </router-link>
                                        </p>
                                        <Favorie :video-id="video.id" :favored-video="video.favored"/>
                                        <p v-if="video.playliste">Playliste :
                                            <router-link :to="{ name: 'showPlaylist', params: {slug: video.playliste.slug, id: video.playliste.id}}">
                                                {{video.playliste.name}}
                                            </router-link>
                                        </p>
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
                                        ...
                                    </p>
                                    <br>
                                    <time datetime="2016-1-1">{{video.publishedAt|formatDate}}</time>
                                </div>
                            </div>
                        </div>
                    <br>
                    <br>
                </div>
            </div>
        </div>
        <div class="has-text-centered" v-if="showMore">
            <button class="button is-dark" @click="getLoadVideos()">Voir plus de vidéos</button>
        </div>
        <hr>
    </div>
</template>


<script>
    import VideoApi from "../../services/VideoApi";
    import moment from "moment";
    import Favorie from "../favorie/Favorie";

    export default {
        name: "Video",
        components: {Favorie},
        data() {
            return {
              videos: [],
              showMore: null,
              loading: true
            }
        },
        created() {
            VideoApi.getVideos()
                .then(response => {
                    this.loading = false
                    this.videos = response.data.videos
                    this.showMore = true
                })
                .catch(() => {
                  this.loading = false
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
            getImageUrl(name) {
                return this.$hostImages + "/videos/" + name;
            },
            getImageTechnoUrl(name) {
                return this.$hostImages + "/technology/" + name;
            },
            getLoadVideos() {
                let date = this.videos[this.videos.length - 1];
                VideoApi.getLoadVideos(date.publishedAt)
                    .then(response => {
                        this.videos = this.videos.concat(response.data.videos)
                        if(response.data.videos.length === 0) {
                            this.showMore = false
                        }
                    })
                    .catch(() => {
                        alert('Erreur serveur !')
                    })
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
    .notification {
        background-color: #D2D2D2;
    }
</style>