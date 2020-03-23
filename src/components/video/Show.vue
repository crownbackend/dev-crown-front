<template>
    <div v-if="video" class="container">
        <h1 class="has-text-centered title is-1">{{video.title}}</h1>
        <br>
        <div>
            <p class="video-container" v-html="video.videoURL"></p>
        </div>
        <div class="has-text-centered">
            <div v-if="isLoggedIn" class="download-video">
                <button @click="downloadVideo(video.nameFileVideo)" class="button is-dark">
                    Télécharger la vidéo
                    <i class="fas fa-download"></i>
                </button>
            </div>
            <div v-else class="download-video">
                <p class="subtitle is-4">
                    <router-link :to="{name: 'Register'}" class="button is-dark">
                        Inscris toi
                    </router-link>
                    ou
                    <router-link :to="{name: 'Login'}" class="button">
                        Connecte toi
                    </router-link>
                    pour télécharger la vidéo.
                </p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-1">
                Partager la vidéo :
            </div>
            <div class="col-md-1">
                <i class="fab fa-facebook-square fa-3x" style="color: #3b5998"></i>
            </div>
            <div class="col-md-1">
                <i class="fab fa-twitter-square fa-3x" style="color: #00acee"></i>
            </div>
            <div class="col-md-1">
                <i class="fas fa-envelope-square fa-3x"></i>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-8">
                <p v-html="video.description" class="content"></p>
            </div>

            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-12" v-if="video.technology">
                        <div>Technologie : {{video.technology.name}}</div>
                    </div>
                    <br>
                    <div class="col-md-12">
                        <div class="content">Playliste : {{video.playliste.name}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import VideoApi from "../../services/VideoApi";
    import axios from "axios";

    export default {
        name: "Show",
        data() {
            return {
                video: null,
            }
        },
        mounted() {
            VideoApi.getVideo(this.$route.params.slug, this.$route.params.id)
                .then(response => {
                    this.video = response.data.video
                    document.title = this.video.title
                })
                .catch(() => {
                    alert("Erreur serveur")
                })
        },
        methods: {
            getImageUrl(name, docs) {
                return this.$hostImages + "/"+docs+"/" + name;
            },
            getUrlVideo(name) {
                return this.$hostVideos + name;
            },
            downloadVideo(name) {
                axios({
                    url: this.$hostVideos + name,
                    method: 'GET',
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.pdf');
                    document.body.appendChild(link);
                    link.click();
                });
            }
        },
        computed: {
            isLoggedIn(){
                return this.$store.getters.isLoggedIn
            }
        },
    }
</script>

<style>
    .video-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        height: 0;
    }
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .content {
        padding-bottom: 50px
    }

    .download-video {
        padding-top: 10px;
    }

</style>