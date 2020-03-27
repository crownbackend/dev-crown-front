<template>
    <div>
        <div v-if="isLoggedIn">
            <form method="post">
                <div class="field">
                    <label class="label">Message</label>
                    <div class="control">
                        <textarea v-model="comment" class="textarea" placeholder="Votre commentaire"></textarea>
                    </div>
                    <p class="help is-danger"></p>
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
        <div class="title is-3"> commentaires</div>
    </div>
</template>

<script>
    import moment from "moment";
    import CommentApi from "../services/CommentApi";

    export default {
        name: "Comment",
        data() {
            return {
                comment: null,
            }
        },
        mounted() {
            CommentApi.getComments(this.$route.params.id)
                .then(response => {
                    this.comments = response.data.comments
                })
                .catch(console.error)
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