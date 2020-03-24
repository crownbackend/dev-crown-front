<template>
    <div>
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Retrouver ici toutes les vidéos de ma chaîne Youtube !
            </h1>
        </div>
        <br>
        <div class="has-text-centered">
            <div class="title is-3">
                Les dernières vidéos
            </div>
            <div class="row" v-for="i in videosGroups" v-bind:key="i">
                <div class="col-md-4" v-for="video in videos.slice(i * itemsPerRow, (i + 1) * itemsPerRow)" v-bind:key="video.id">
                    <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                                        <img v-bind:src="getImageUrl(video.imageFile)" :alt="video.imageFile">
                                    </router-link>>
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <p style="float: right" v-if="video.technology">
                                            <img width="100" height="100" v-bind:src="getImageTechnoUrl(video.technology.imageFile)" :alt="video.technology.imageFile">
                                        </p>
                                        <p v-if="video.playliste">Playliste : {{video.playliste.name}}</p>
                                        <br>
                                        <router-link :to="{ name: 'videoShow', params: {slug: video.slug, id: video.id}}">
                                            <p class="title is-4">
                                                {{video.title}}
                                            </p>
                                        </router-link>>
                                        <br>
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
                    <hr>
                </div>
            </div>
        </div>
        <hr>
    </div>
</template>


<script>
    import VideoApi from "../../services/VideoApi";
    import moment from "moment";

    export default {
        name: "Video",
        data() {
            return {
                itemsPerRow: 3,
                videos: [],
            }
        },
        mounted() {
            VideoApi.getVideos()
                .then(response => {
                    this.videos = response.data.videos
                })
                .catch(() => {
                   alert('Erreur serveur !');
                })
        },
        computed: {
            videosGroups () {
                return Array.from(Array(Math.ceil(this.videos.length / this.itemsPerRow)).keys())
            }
        },
        filters: {
            formatDate(value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        },
        methods: {
            getImageUrl(name) {
                return this.$hostImages + "/videos/" + name;
            },
            getImageTechnoUrl(name) {
                return this.$hostImages + "/technology/" + name;
            }
        }
    }
</script>