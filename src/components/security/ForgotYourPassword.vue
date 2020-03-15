<template>
    <div>
        <div class="container notification">
            <div v-if="formEmpty">
                <h1 class="title is-1 has-text-centered">Mot de passe oublié ?</h1>
                <form method="post" @submit.prevent="sendForm">
                    <div class="is-divider"></div>
                    <div class="field">
                        <label for="email" class="label">Adresse email</label>
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="email" id="email" @keyup="verifyEmail" placeholder="Email" v-model="email">
                            <span class="icon is-small is-left">
                          <i class="fas fa-envelope"></i>
                        </span>
                        </p>
                        <p class="help is-danger">{{error}}</p>
                    </div>
                    <div class="field">
                        <button class="button is-primary is-fullwidth" :disabled="disabled" v-bind:class="clickable">
                            Réinitialiser le mot de passe
                        </button>
                    </div>
                </form>
            </div>

            <div v-if="afterFailed">
                <p class="subtitle is-2">
                    Aucun compte na été trouvé avec cette email !
                </p>
                <p class="subtitle is-2">
                    Vous pouvez vous inscrire sur notre site juste en cliquant : <br>
                    <router-link :to="{name: 'register'}">
                        sur ce lien
                    </router-link>
                </p>
            </div>

            <div class="has-text-centered" v-if="afterSuccess">
                <i class="fas fa-paper-plane" style="font-size: 15rem"></i>
                <h3 class="title is-3">
                    Mot de passe oublié
                </h3>
                <p class="subtitle">
                    Un email vient de vous être envoyé, afin de réinitialiser votre mot de passe.
                </p>
            </div>

        </div>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi";

   export default {
        name: "ForgotYourPassword",
        data() {
          return {
              email: null,
              error: null,
              clickable: "no-click is-disabled",
              disabled: true,
              formEmpty: true,
              afterSuccess: false,
              afterFailed: false
          }
        },
        methods: {
            sendForm() {
                UserApi.sendNewPassword(this.email)
                    .then(response => {
                        console.log(response)
                        if(response.data.error === 1) {
                            this.formEmpty = false
                            this.afterFailed = true
                        } else if(response.data.success === 1) {
                            this.formEmpty = false
                            this.afterSuccess = true
                        }
                    })
                    .catch(() => {
                        alert("Problème serveur veuillez recommencé plutard")
                    })
            },
            verifyEmail() {
                if(this.validEmail(this.email)) {
                    this.disabled = false
                    this.clickable = ""
                    this.error = null
                } else if(this.email.length === 0) {
                    this.error = "Veuillez saisir une adresse email.\n"
                    this.disabled = true
                    this.clickable = "no-click is-disabled"
                } else {
                    this.disabled = true
                    this.clickable = "no-click is-disabled"
                    this.error = "Vérifiez l'adresse email, son format n'est pas valide.\n"
                }
            },

            validEmail(email) {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
        }
    }
</script>

<style>
    .no-click {
        pointer-events: none;
    }

</style>