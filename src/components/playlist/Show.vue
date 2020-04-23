<template>
    <div v-if="playlist">
        <h1 class="has-text-centered title is-1">{{playlist.name}}</h1>
        <br>
        <p class="subtitle is-4 container">
            {{playlist.description}}
        </p>
        <br>
        <div class="title is-3 has-text-centered" v-if="videos.length !== 0">
            La liste des vidéos
        <hr>
        </div>
        <div v-else>
            <h1 class="title is-1 has-text-centered">Aucune vidéo pour l'instant</h1>
        </div>
        <br>
        <div class="row" v-if="videos">
            <div class="col-md-4" v-for="video in videos" v-bind:key="video.id">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                                <img v-bind:src="getImageUrl(video.imageFile)" :alt="video.imageFile">
                            </router-link>
                        </figure>
                    </div>
                    <div class="card-content has-text-centered">
                        <div class="media">
                            <div class="media-content">
                                <p style="float: right" v-if="video.technology">
                                    <router-link :to="{ name: 'showTechnology', params: {slug: video.technology.slug, id: video.technology.id}}">
                                        <img width="100" height="100" v-bind:src="getImageTechnoUrl(video.technology.imageFile)" :alt="video.technology.imageFile">
                                    </router-link>
                                </p>
                                <p v-if="video.playliste">Playliste : {{video.playliste.name}}</p>
                                <br>
                                <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                                    <p class="title is-4">
                                        {{video.title}}
                                    </p>
                                </router-link>
                                <br>
                                <p class="subtitle is-6">Dev-crown</p>
                            </div>
                        </div>

                        <div class="content">
                            <p v-html="video.description.slice(0, 100)">
                                ...
                            </p>
                            <br>
                            <time datetime="2016-1-1">{{video.publishedAt | formatDate}}</time>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <br>
        <div class="has-text-centered" v-if="showMore">
            <button class="button is-dark" @click="getLoadVideos()">Voir plus de vidéos</button>
        </div>
        <br>
    </div>
</template>

<script>
    import PlaylistApi from "../../services/PlaylistApi";
    import moment from "moment";

    export default {
        name: "Show",
        data() {
            return {
                playlist: null,
                videos: [],
                showMore: false
            }
        },
        mounted() {
            PlaylistApi.getPlaylist(this.$route.params.slug, this.$route.params.id)
                .then(response => {
                    this.playlist = response.data.playlist
                    this.videos = response.data.videos
                    if(this.videos.length >= 9) {
                        this.showMore = true
                    }
                    document.title = response.data.playlist.name
                    document.querySelector('meta[name="description"]').setAttribute("content", response.data.playlist.description.slice(0, 155));
                })
                .catch(() => {
                    alert('Erreur serveur')
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
                let video = this.videos[this.videos.length - 1];
                PlaylistApi.getLoadMoreVideosPlaylist(this.$route.params.id, video.publishedAt)
                    .then(response => {
                        this.videos = this.videos.concat(response.data)
                        if(response.data.length === 0) {
                            this.showMore = false
                        }
                    })
                    .catch(() => {
                        alert("Erreur serveur !")
                    })
            }
        },
        filters: {
            formatDate(value) {
                return moment(String(value)).fromNow()
            }
        },
    }
</script>