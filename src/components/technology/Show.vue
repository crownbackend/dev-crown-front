<template>
    <div>
        <div v-if="technology">
            <h1 class="has-text-centered title is-1">{{technology.name}}</h1>
            <br>
            <div class="notification">
                <p class="subtitle is-4 has-text-centered">
                    {{technology.description}}
                </p>
            </div>
            <br>
            <div class="title is-3 has-text-centered" v-if="videos.length !== 0">
                La liste des vidéos
            </div>
            <div v-else>
                <h1 class="title is-1 has-text-centered">Aucune vidéo pour l'instant</h1>
            </div>
            <hr>
            <div class="row" v-if="videos">
                <div class="col-md-4 has-text-centered" v-for="video in videos" v-bind:key="video.id">
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
                    <br>
                    <br>
                    <hr>
                </div>
            </div>
            <div class="has-text-centered show-more" v-if="showMore">
                <button class="button is-dark" @click="getLoadVideos()">Voir plus de vidéos</button>
            </div>
        </div>
    </div>
</template>

<script>
    import TechnologyApi from "../../services/TechnologyApi";
    import moment from "moment";
    import Favorie from "../favorie/Favorie";

    export default {
        name: "Show",
        components: {Favorie},
        data() {
            return {
                technology: null,
                videos: [],
                showMore: false
            }
        },
        mounted() {
            TechnologyApi.getTechnology(this.$route.params.id, this.$route.params.slug)
                .then(response => {
                    this.technology = response.data.technology
                    this.videos = response.data.videos
                    document.title = response.data.technology.name
                    document.querySelector('meta[name="description"]').setAttribute("content", response.data.technology.description.slice(0, 155));
                    if(this.videos.length > 8) {
                        this.showMore = true
                    }
                })
                .catch(() => {
                    alert('Erreur serveur')
                    this.$store.dispatch('logout')
                    this.$router.go(this.$router.currentRoute)
                })
        },
        filters: {
            formatDate(value) {
                return moment(String(value)).fromNow()
            }
        },
        methods: {
            getImageUrl(name) {
                return this.$hostImages + "/videos/" + name;
            },
            getImageTechnoUrl(name) {
                return this.$hostImages + "/technology/" + name;
            },
            getLoadVideos() {
                let technology = this.videos[this.videos.length - 1];

                TechnologyApi.getLastVideosTechnology(technology.publishedAt, technology.technology.id)
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
        }
    }
</script>