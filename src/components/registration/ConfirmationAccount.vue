<template>
    <div class="container">
        <div class="notification" v-if="account">
            <h1 class="title is-1">
                Votre compte est maintenant actif
            </h1>
            <br>
            <p class="subtitle is-3">Pour vous connecter veuillez <router-link :to="{name: 'Login'}">cliquer ici</router-link></p>
        </div>
        <div class="notification" v-if="errorConfirmation">
            <h1 class="title is-2">Une erreur est survenu lors de l'activation de votre compte veuillez contacter l'administrateur du site !</h1>
        </div>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi";

    export default {
        name: "ConfirmationAccount",
        data() {
              return {
                  account: false,
                  errorConfirmation: false
            }
        },
        mounted() {
            UserApi.confirmationAccount(this.$route.params.token)
            .then(response => {
                if(response.data.confirmation === 1) {
                    this.account = true
                } else {
                    this.errorConfirmation = true
                }
            })
            .catch(() => {
               alert('Erreur serveur !')
            })
        }
    }
</script>