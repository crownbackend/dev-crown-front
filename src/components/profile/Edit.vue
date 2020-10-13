<template>
    <div class="container" v-if="user">
      <div class="loading-overlay is-active" v-if="loading">
        <div class="loading-background"></div>
        <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
      </span>
      </div>
        <h1 class="title is-2">Editer mes informations</h1>
        <div class="notification">
            <figure v-if="user.avatar" >
                <img class="is-rounded" width="150" height="150" :src="getImageUrl(user.avatar, 'avatars')" :alt="user.avatar">
            </figure>
            <br>
            <form method="post" @submit.prevent="sendForm">
                <b-field class="file">
                    <b-upload v-model="file">
                        <a class="button is-primary">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span>Importer un avatar</span>
                        </a>
                    </b-upload>
                    <span class="file-name" v-if="file">
                        {{ file.name }}
                    </span>
                </b-field>
                <div class="field">
                    <label class="label">Nom d'utilisateur</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Pseudo" v-on:keyup="verifyUsername" v-model="user.username">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                    <p class="help is-danger">{{usernameMessageError}}</p>
                </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="Un email de confirmation sera envoyer !" v-on:keyup="verifyEmail" v-model="user.email">
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
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-dark is-outlined">Editer mes informations</button>
                    </div>
                </div>
            </form>
        </div>
    <br>
    </div>
</template>

<script>
    import UserApi from "../../services/UserApi";

    export default {
        name: "Edit",
        data() {
          return {
              user: null,
              password: null,
              passwordGood: false,
              passwordMessageError: null,
              usernameMessageError: null,
              usernameGood: false,
              emailMessageError: null,
              emailGood: false,
              file: null,
              loading: false
          }
        },
        mounted() {
            UserApi.verifyProfile(this.$route.params.username)
                .then(response => {
                    if(response.data.username == localStorage.getItem("user")) {
                        this.user = response.data
                        document.title = this.user.username
                    } else {
                        this.$store.dispatch('logout')
                    }
                })
                .catch(err => {
                    if(err.response.status == 500) {
                        this.$store.dispatch('logout')
                    }
                })
        },
        methods: {
            sendForm() {
              this.loading = true
                UserApi.editProfile(this.user.username, this.user.email, this.password, this.file)
                    .then(response => {
                        if(response.data.edit == 1) {
                            this.loading = false
                            this.$buefy.notification.open({
                                message: 'Votre compte a bien été modifié.',
                                type: 'is-success'
                            })
                            this.$store.dispatch('logout')
                            this.$router.push('/mon-compte/connexion')
                        } else if(response.data.detail) {
                            this.loading = false
                            this.$buefy.notification.open({
                                message: response.data.detail,
                                type: 'is-danger'
                            })
                        } else {
                            this.loading = false
                            this.$buefy.notification.open({
                                message: response.data,
                                type: 'is-danger'
                            })
                        }
                    })
                    .catch(err => {
                        if(err.response.status == 500) {
                            this.$store.dispatch('logout')
                        }
                    })
            },
            verifyUsername() {
                if(this.user.username.length < 2) {
                    this.usernameMessageError = "Le nom d’utilisateur est trop court. Veuillez saisir au moins 2 caractères.\n";
                    this.usernameGood = false
                } else {
                    UserApi.verifyUsername(this.user.username)
                        .then(response => {
                            if(response.data.good === 1) {
                                this.usernameGood = true;
                                this.usernameMessageError = null
                            } else if(response.data.error === 1 && response.data.username != localStorage.getItem("user")){
                                this.usernameMessageError = "Nom d'utilisateur déja pris !"
                                this.usernameGood = false;
                            }
                        })
                        .catch(() => {
                            alert("Erreur serveur")
                        })
                }
            },
            verifyEmail() {
                if(!this.validEmail(this.user.email)) {
                    this.emailMessageError = "Email non valid"
                    this.emailGood = false
                } else {
                    UserApi.verifyEmail(this.user.email)
                        .then(response => {
                            if(response.data.good === 1) {
                                this.emailGood = true;
                                this.emailMessageError = null
                            } else if(response.data.error === 1&& response.data.email != localStorage.getItem("email")){
                                this.emailMessageError = "Email déja pris !"
                                this.emailGood = false;
                            }
                        })
                        .catch(() => {
                            alert('Erreur serveur')
                        })
                }
            },
            verifyPassword() {
                if(this.password_check(this.password)) {
                    this.passwordMessageError = null
                    this.passwordGood = true
                } else {
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
            getImageUrl(name, docs) {
                return this.$hostImages + "/"+docs+"/" + name;
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