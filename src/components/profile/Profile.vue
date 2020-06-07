<template>
    <div v-if="user">
        <div class="container">
            <div class="title is-2 profile">
                Mon profile
            </div>
            <div class="title is-2">
                <router-link :to="{name: 'editProfile', params: {username: user.username}}">
                    <i class="fas fa-edit" title="Editer"></i>
                </router-link>
            </div>
            <div class="row">
                <div class="col-md-12">
                    Mes vidéos favorites
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    Mes sujets
                </div>
                <div class="col-md-6">
                    Mes réponse
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi";

    export default {
        name: "Profile",
        data() {
            return {
                user: null
            }
        },
        mounted() {
            UserApi.verifyProfile(this.$route.params.username)
                .then(response => {
                    this.user = response.data
                    document.title = this.user.username
                })
                .catch(err => {
                    if(err.response.status == 500) {
                        this.$store.dispatch('logout')
                    }
                })
        }
    }
</script>

<style>
    .profile {
        float: left;
        padding-right: 50px;
    }
</style>