<template>
    <div v-if="video" class="container">
        <hr>
        <h1 class="has-text-centered title is-1">{{video.title}}</h1>
        <br>
        <div>
            <p class="video-container" v-html="video.videoURL"></p>
        </div>
        <hr>
        <div>
            <span style="float: right" class="subtitle is-5">{{video.publishedAt|formatDate}}</span>
            <div v-if="isLoggedIn" class="download-video">
                <button @click="downloadVideo(video.nameFileVideo)" v-if="verifyDateVideoDownload(video.publishedAt)" class="button is-dark">
                    Télécharger la vidéo
                    <i class="fas fa-download"></i>
                </button>
            </div>
            <div v-else class="download-video">
                <p class="subtitle is-5">
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
        <div>
            <span class="subtitle is-5">
                Partager la vidéo :
            </span>
            <span class="share">
                <i class="fab fa-facebook-square fa-3x" style="color: #3b5998"></i>
            </span>
            <span class="share">
                <i class="fab fa-twitter-square fa-3x" style="color: #00acee"></i>
            </span>
            <span class="share">
                <i class="fas fa-envelope-square fa-3x"></i>
            </span>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-8">
                <p v-highlightjs v-html="video.description" class="content"></p>
            </div>

            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-12" v-if="video.technology">
                        <div>
                            Technologie :
                            <router-link :to="{name: 'showTechnology', params: {slug: video.technology.slug, id: video.technology.id}}">
                                {{video.technology.name}}
                            </router-link>
                        </div>
                    </div>

                    <div class="col-md-12" v-if="video.playliste">
                        Playliste :
                        <router-link :to="{name: 'showPlaylist', params: {slug: video.playliste.slug, id: video.playliste.id}}">
                            {{video.playliste.name}}
                        </router-link>
                    </div>
                    <div class="col-md-12">
                        <div class="content">
                            Ajouter à mes favories
                            <Favorie :video-id="video.id" :favored-video="video.favored"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <br>
        <div v-if="isLoggedIn">
            <form method="post" @submit.prevent="sendForm">
                <div class="field">
                    <label class="label">Message</label>
                    <div class="control">
                        <textarea v-model="comment" class="textarea" placeholder="Votre commentaire"></textarea>
                    </div>
                    <p class="help is-danger">{{commentError}}</p>
                    <br>
                    <button class="button is-primary">
                        Ajouter
                    </button>
                </div>
            </form>
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
                pour ajouter un commentaire.
            </p>
        </div>
        <br>
        <div class="title is-3">{{comments.length}} commentaires</div>
        <div v-for="comment in comments" v-bind:key="comment.id">
            <div class="notification comment">
                <figure class="image img-avatar">
                    <img class="is-rounded" :src="getImageUrl(comment.user.avatar, 'avatars')" :alt="comment.user.avatar">
                </figure>
                <div class="content-author">
                    <strong>{{comment.user.username}}</strong>
                    {{comment.createdAt|formatDate}},
                    <span v-if="comment.updatedAt">
                        Dernière modification
                        {{comment.updatedAt|formatDate}},
                    </span>
                    <span v-if="isLoggedIn && getUser == comment.user.id">
                        <span class="icon-comment" @click.prevent="editComment(comment.id)">
                            <i class="fas fa-edit"></i>
                        </span>
                        <span class="icon-comment" @click.prevent="deleteComment(comment.id)">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                    </span>
                </div>
                <br>
                <p :id="'comment_'+comment.id" class="pre-formatted">
                    {{comment.content}}
                </p>
                <form @submit.prevent="sendEditComment(comment.id, comment.content)" v-if="formEditComment && comment.id === idChange">
                    <div class="field">
                        <label class="label">Message</label>
                        <div class="control">
                            <textarea v-model="comment.content" class="textarea" placeholder="Votre commentaire"></textarea>
                        </div>
                        <p class="help is-danger">{{commentErrorEdit}}</p>
                        <br>
                        <button class="button is-primary">
                            Editer
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <br>
    </div>
    <div v-else>
      <div class="loading-overlay is-active">
        <div class="loading-background"></div>
        <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
          </span>
      </div>
    </div>
</template>

<script>
    import VideoApi from "../../services/VideoApi";
    import axios from "axios";
    import CommentApi from "../../services/CommentApi";
    import moment from "moment";
    import Favorie from "../favorie/Favorie";

    export default {
        name: "Show",
        components: {Favorie},
        data() {
            return {
                video: null,
                formValid: false,
                comment: null,
                commentError: null,
                sendValid: false,
                comments: [],
                formEditComment: false,
                idChange: null,
                commentErrorEdit: null,
                formEdit: false,
            }
        },
        created() {
            VideoApi.getVideo(this.$route.params.slug, this.$route.params.id)
                .then(response => {
                    this.video = response.data.video
                    document.title = this.video.title
                })
                .catch(() => {
                    alert('Erreur serveur')
                    // this.$store.dispatch('logout')
                    // this.$router.go(this.$router.currentRoute)
                })
            CommentApi.getComments(this.$route.params.id)
            .then(response => {
                this.comments = response.data.comments
            })
            .catch(() => {
                alert("Erreur serveur !")
            })
        },
        methods: {
            sendForm() {
                this.verifyComment()
                if(this.formValid) {
                    CommentApi.newComment(this.comment, this.$route.params.id)
                        .then(response => {
                            if(response.data.comment === 0) {
                                this.formValid = false
                                this.commentError = "Votre commenaitre est trop court (au moins 10 caractères)"
                            } else {
                                this.comments = response.data.comments
                                this.comment = null
                                this.$buefy.notification.open({
                                    message: 'Commentaire ajouter !',
                                    type: 'is-success'
                                })
                            }
                        })
                        .catch(err => {
                            if(err.response.status == 500) {
                                this.$store.dispatch('logout')
                            }
                        })
                }
            },
            editComment(id) {
                this.idChange = id
                this.formEditComment = true
            },
            deleteComment(id) {
                if(confirm('Voulez vous vraiment supprimer ce commentaire ?')) {
                    CommentApi.deleteComment(id)
                        .then(response => {
                            this.comments = response.data.comments
                            this.$buefy.notification.open({
                                message: 'Commentaire supprimer avec succées',
                                type: 'is-success'
                            })
                        })
                        .catch(err => {
                            if(err.response.status == 500) {
                                this.$store.dispatch('logout')
                            }
                        })
                }
            },
            sendEditComment(id, content) {
                this.verifyEditComment(content)
                if(this.formEdit) {
                    CommentApi.editComment(id, content)
                        .then(response => {
                            if(response.data.comment === 0) {
                                this.commentError = "Votre commenaitre est trop court (au moins 10 caractères)"
                            } else if(response.data.edit === 1) {
                                this.comments = response.data.comments
                                this.formEditComment = false
                            }
                        })
                        .catch(err => {
                            if(err.response.status == 500) {
                                this.$store.dispatch('logout')
                                this.formEditComment = false
                            }
                        })
                }

            },
            verifyEditComment(content) {
                if(content && content.length < 10) {
                    this.formEdit = false
                    this.commentErrorEdit = "Votre commenaitre est trop court (au moins 10 caractères)"
                } else if (content.length === 0){
                    this.formEdit = false
                    this.commentErrorEdit = "Votre commenaitre ne peut être vide."
                } else {
                    this.commentErrorEdit = null
                    this.formEdit = true
                }
            },
            verifyComment() {
                if(this.comment && this.comment.length < 10) {
                    this.formValid = false
                    this.commentError = "Votre commenaitre est trop court (au moins 10 caractères)"
                } else if (this.comment === null){
                    this.formValid = false
                    this.commentError = "Votre commenaitre ne peut être vide."
                } else {
                    this.commentError = null
                    this.formValid = true
                }
            },
            getImageUrl(name, docs) {
                return this.$hostImages + "/"+docs+"/" + name;
            },
            downloadVideo(name) {
                axios.post(this.$hostName+"/check/download/video", {
                    "authorization": localStorage.getItem("token")
                })
                .then(response => {
                    if(response.data.download == 1) {
                        window.open(this.$hostName+"/file/"+name+"/"+localStorage.getItem("token"), "_blank")
                    }
                })
                .catch(err => {
                    if(err.response.status == 500) {
                        this.$store.dispatch('logout')
                    }
                })
            },
          verifyDateVideoDownload(date) {
              let dateC = moment(date).format();
              let nowD = moment().format()
              if(nowD > dateC) {
                return true
              } else {
                return false
              }
          }
        },
        computed: {
            isLoggedIn(){
                return this.$store.getters.isLoggedIn
            },
            getUser() {
                return localStorage.getItem("userId")
            }
        },
        filters: {
            formatDate(value) {
                return moment(value).fromNow()
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

    .img-avatar {
        width: 50px;
        height: 50px;
    }

    .comment {
        margin-bottom: 20px;
    }

    .icon-comment, .share {
        margin-left: 10px;
        cursor: pointer;
    }

    .pre-formatted {
        white-space: pre-wrap;
    }

</style>