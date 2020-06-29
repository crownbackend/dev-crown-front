<template>
    <div>
        <span style="cursor: pointer" @click="addFavored">
            <i class="fa-heart fa-2x" :class="{'far': favored}"></i>
        </span>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi";
    import VideoApi from "../../services/VideoApi";

    export default {
        name: 'Favorie',
        data() {
            return {
                favored: true
            }
        },
        props: {
            videoId: Number
        },
        methods: {
            addFavored() {
                if(localStorage.getItem('token')) {
                    UserApi.verifyToken()
                        .then(response => {
                            if(response.data.token_valid == 1) {
                                VideoApi.addFavored(localStorage.getItem("userId"), this.videoId)
                                .then(response => {
                                    console.log(response)
                                })
                                .catch(console.error)
                            }
                        })
                        .catch(() => {
                            this.$store.dispatch('logout')
                            this.$buefy.notification.open('Il faut être connecté pour ajouter une vidéo au favorie')
                        })
                } else {
                    this.$buefy.notification.open('Il faut être connecté pour ajouter une vidéo au favorie')
                }

            }
        }
    }
</script>
