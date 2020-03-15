<template>
    <div class="container notification">
        <div v-if="formEmpty">
            <h1 class="title is-1 has-text-centered">Modifier mon mot de passe</h1>
            <form method="post" @submit.prevent="sendForm">
                <div class="is-divider"></div>
                <div class="field">
                    <label class="label" for="password">Mot de passe</label>
                    <div class="control">
                        <i class="far fa-eye" id="Bloc1" @click="showPassword"></i>
                        <input id="password" class="input" type="password" v-model="password" v-on:keyup="verifyPassword">
                    </div>
                    <p class="help is-danger">{{error}}</p>
                </div>
                <div class="field">
                    <button class="button is-primary is-fullwidth" :disabled="disabled" v-bind:class="clickable">
                        Réinitialiser le mot de passe
                    </button>
                </div>
            </form>
        </div>
        <div v-if="afterSuccess">
            <p class="subtitle is-3">
                Votre mot de passe à été changer avec success.
                <br>
                Vous pouvez vous maintenant vous connecté <router-link :to="{name: 'login'}">juste ici</router-link>
            </p>
        </div>
        <div v-if="afterError">
            <p class="subtitle is-3">
                Une erreur est survenu lors de votre changement de mot de passe <br>
                <router-link :to="{name: 'forgotPassword'}">
                    Cliquer ici
                </router-link> pour renvoyer un email et changer votre mot de passe
            </p>
        </div>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi";

    export default {
        name: "ConfirmPassword",
        data() {
            return {
                afterSuccess: false,
                afterError: false,
                formEmpty: true,
                disabled: true,
                clickable: "no-click is-disabled",
                password: null,
                error: null
            }
        },
        methods: {
            verifyPassword() {
                if(this.password_check(this.password)) {
                    this.error = null
                    this.clickable = ""
                    this.disabled = false
                } else {
                    this.error = "le mot de passe doit contenir 8 caractères minimum\n" +
                        "1 chiffre minimum\n" +
                        "1 lettre minimum\n" +
                        "1 lettre majuscule\n" +
                        "50 caractères maximum"
                    this.clickable = "no-click is-disabled"
                    this.disabled = true
                }
            },
            sendForm() {
                UserApi.changePassword(this.$route.params.token, this.password)
                .then(response => {
                    console.log(response)
                    if(response.data.success === 1) {
                        this.afterSuccess = true
                        this.formEmpty = false
                    } else if(response.data.error === 0) {
                        this.formEmpty = false
                        this.afterError = true
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            password_check(pass) {
                let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$/;
                if (regex.exec(pass) == null) {
                    return 0;
                }
                else {
                    return 1
                }
            },
            showPassword() {
                var temp = document.getElementById("password");
                if (temp.type === "password") {
                    temp.type = "text";
                }
                else {
                    temp.type = "password";
                }
            },
        }
    }
</script>

<style>
    .no-click {
        pointer-events: none;
    }
    #Bloc1 {
        cursor: pointer;
    }
</style>