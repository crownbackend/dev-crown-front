<template>
    <div class="container">
        <div class="notification" style="margin-bottom: 50px">
            <div v-if="formRegister" class="columns">
                <div class="column is-half">
                    <form method="post" @submit.prevent="sendForm" @change="checkFormValid">
                        <div class="field">
                            <label class="label">Nom d'utilisateur</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" placeholder="Pseudo" v-on:keyup="verifyUsername" v-model="username">
                                <span class="icon is-small is-left">
                                  <i class="fas fa-user"></i>
                                </span>
                            </div>
                            <p class="help is-danger">{{usernameMessageError}}</p>
                        </div>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="email" placeholder="Un email de confirmation sera envoyer !" v-on:keyup="verifyEmail" v-model="email">
                                <span class="icon is-small is-left">
                                  <i class="fas fa-envelope"></i>
                                </span>
                            </div>
                            <p class="help is-danger">{{emailMessageError}}</p>
                        </div>
                        <div class="field">
                            <label class="label" for="password">Mot de passe</label>
                            <div class="control">
                                <i class="far fa-eye" id="Bloc1" @click="showPassword"></i>
                                <input id="password" class="input" type="password" placeholder="Mot de passe" v-on:keyup="verifyPassword" v-model="password">
                                <p class="help is-danger">{{passwordMessageError}}</p>
                            </div>
                        </div>
                        <br>
                        <div class="field is-grouped">
                            <div class="control">
                                <button class="button is-dark is-outlined" :class="{'cursor': !formValid}" :disabled="!formValid">Créer mon compte</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="column is-half">
                    <h1 class="title is-2">
                        Pourquoi s'inscrire ?
                    </h1>
                    <p class="subtitle is-4">
                        Créer votre compte pour ne raté aucune nouvelle vidéo,
                        participer a la vie du site et créer de nouveau sujet dans le forum.
                    </p>
                </div>
            </div>

            <div v-if="afterSuccess">
                <h1 class="title is-1">
                    Inscription réussie avec succès
                </h1>
                <p class="subtitle is-4">
                    Un email de confirmation va vous être envoyer, veuillez cliquer dessu pour
                    finir votre inscription !
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi";

    export default {
        name: "Register",
        data() {
            return {
                email: null,
                emailMessageError: null,
                username: null,
                usernameMessageError: null,
                password: null,
                passwordMessageError: null,
                emailGood: false,
                usernameGood: false,
                passwordGood: false,
                formValid: false,
                afterSuccess: false,
                formRegister: true
            }
        },
      mounted() {
          if(localStorage.getItem("token")) {
            this.$router.push({name: "Home"})
          }
      },
      methods: {
            checkFormValid() {
                if(this.emailGood && this.usernameGood && this.passwordGood) {
                    this.formValid = true
                } else {
                    this.formValid = false
                }
            },
            sendForm() {
                if(this.formValid) {
                    UserApi.register(this.email, this.username, this.password)
                    .then(response => {
                        if(response.data.created === 1) {
                            this.afterSuccess = true;
                            this.formRegister = false;
                        }
                    })
                    .catch(() =>  {
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
                    alert('Erreur le formulaire n\'est pas remplis')
                }
            },
            verifyUsername() {
                if(this.username.length < 2) {
                    this.usernameMessageError = "Le nom d’utilisateur est trop court. Veuillez saisir au moins 2 caractères.\n";
                    this.usernameGood = false
                    this.formValid = false
                } else {
                    UserApi.verifyUsername(this.username)
                    .then(response => {
                        if(response.data.good === 1) {
                            this.usernameGood = true;
                            this.usernameMessageError = null
                        } else if(response.data.error === 1){
                            this.usernameMessageError = "Nom d'utilisateur déja pris !"
                            this.usernameGood = false;
                            this.formValid = false
                        }
                    })
                    .catch(() => {
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
            },
            verifyEmail() {
                if(!this.validEmail(this.email)) {
                    this.emailMessageError = "Email non valid"
                    this.emailGood = false
                    this.formValid = false
                } else {
                    UserApi.verifyEmail(this.email)
                    .then(response => {
                        if(response.data.good === 1) {
                            this.emailGood = true;
                            this.emailMessageError = null
                        } else if(response.data.error === 1){
                            this.emailMessageError = "Email déja pris !"
                            this.emailGood = false;
                            this.formValid = false
                        }
                    })
                    .catch(() => {
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
            },
            verifyPassword() {
                if(this.password_check(this.password)) {
                    this.passwordMessageError = null
                    this.passwordGood = true
                } else {
                    this.formValid = false
                    this.passwordGood = false
                    this.passwordMessageError = "le mot de passe doit contenir 8 caractères minimum,\n" +
                        "1 chiffre minimum\n" +
                        "1 lettre minimum\n" +
                        "1 lettre majuscule\n" +
                        "50 caractères maximum"
                }
            },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
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
    #Bloc1 {
        float:right ;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
    }
</style>