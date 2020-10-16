<template>
    <div>
        <span style="cursor: pointer" @click="addFavored">
<!--            <i v-if="favoredVideo" class="fas fa-heart fa-2x"></i>-->
<!--            <i v-else class="far fa-heart fa-2x"></i>-->
            <i class="fa-heart fa-2x" :class="{'fas': favoredTrue, 'far': favoredFalse}"></i>
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
                favoredTrue: null,
                favoredFalse: null
            }
        },
        props: {
          videoId: Number,
          favoredVideo: Number,
          profile: Boolean
        },
        mounted() {
            if(this.favoredVideo == 1) {
                this.favoredTrue = true
            } else {
                this.favoredFalse = true
            }
        },
        methods: {
          addFavored() {
            if(localStorage.getItem('token')) {
              UserApi.verifyToken()
                  .then(response => {
                    if(response.data.token_valid == 1) {
                      if(this.favoredTrue == true) {
                        VideoApi.removeFavored(localStorage.getItem("userId"), this.videoId)
                            .then(response => {
                              if(response.data.success === 1) {
                                this.favoredFalse = true
                                this.favoredTrue = false
                                this.$buefy.notification.open({
                                  message: 'Video supprimer de vos favories !',
                                  type: 'is-danger'
                                })
                                if(this.$props.profile === true) {
                                  UserApi.getVideo(this.$parent.$data.userId)
                                      .then(response => {
                                        this.$parent.$data.videos = response.data.videos
                                      })
                                      .catch(() => {
                                        this.$store.dispatch('logout')
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
                                }
                              }
                            })
                            .catch(() => {
                              this.$store.dispatch('logout')
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
                      } else {
                        VideoApi.addFavored(localStorage.getItem("userId"), this.videoId)
                            .then(response => {
                              if(response.data.success === 1) {
                                this.favoredTrue = 1
                                this.$buefy.notification.open({
                                  message: 'Video ajouter à vos favories !',
                                  type: 'is-success'
                                })
                              }
                            })
                            .catch(() => {
                              this.$store.dispatch('logout')
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
                      }
                    }
                  })
                  .catch(() => {
                    this.$store.dispatch('logout')
                    this.$buefy.notification.open('Il faut être connecté pour ajouter une vidéo au favorie')
                  })
            } else {
              this.$buefy.notification.open('Il faut être connecté pour ajouter une vidéo au favorie')
            }
          },
        }
    }
</script>
