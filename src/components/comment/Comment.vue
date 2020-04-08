<template>
    <div>
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
        <br>
        <div class="title is-3">{{comments.length}} commentaires</div>
        <div v-for="comment in comments" v-bind:key="comment.id">
            <div class="notification comment">
                <figure class="image img-avatar">
                    <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
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
</template>

<script>
    import moment from "moment";
    import CommentApi from "../../services/CommentApi";

    export default {
        name: "Comment",
        data() {
            return {
                formValid: false,
                comment: null,
                commentError: null,
                sendValid: false,
                comments: [],
                formEditComment: false,
                idChange: null,
                commentErrorEdit: null,
                formEdit: false
            }
        },
        mounted() {
            CommentApi.getCommentsArticle(this.$route.params.id)
                .then(response => {
                    this.comments = response.data.comments
                })
                .catch(() => {
                    alert('Erreur serveur !')
                })
        },
        methods: {
            sendForm() {
                this.verifyComment()
                if(this.formValid) {
                    CommentApi.newCommentArticle(this.comment, this.$route.params.id)
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
                    CommentApi.deleteCommentArticle(id)
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
                    CommentApi.editCommentArticle(id, content)
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