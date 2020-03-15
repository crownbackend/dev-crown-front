<template>
    <div>
        <div class="container">
            <div class="notification">
                <h1 class="title is-1 has-text-centered">Connexion</h1>
                <form method="post" @submit.prevent="login">
                    <div class="is-divider is-primary"></div>
                    <div class="field">
                        <label for="username" class="label">Nom d'utilisateur</label>
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="text" id="username" placeholder="Pseudo" v-model="username">
                            <span class="icon is-small is-left">
                          <i class="fas fa-user"></i>
                        </span>
                        </p>
                    </div>
                    <br>
                    <div class="field">
                        <label for="password" class="label">Mot de passe</label>
                        <p class="control has-icons-left">
                            <input class="input" type="password" id="password" placeholder="Mot de passe" v-model="password">
                            <span class="icon is-small is-left">
                         <i class="fas fa-lock"></i>
                        </span>
                        </p>
                    </div>
                    <div class="field">
                        <router-link :to="{name: 'forgotPassword'}">
                            Mot de passe oublier
                        </router-link>
                    </div>
                    <div class="error" v-if="errorMessage">{{errorMessage}}</div>
                    <br>
                    <div class="field">
                        <p class="control">
                            <button class="button is-dark is-outlined is-fullwidth" v-bind:class="{'is-loading': loading}" >
                                Se connecter
                            </button>
                        </p>
                    </div>
                </form>

                <br>
                <div>
                    <router-link to="/inscription" class="button is-dark is-fullwidth">
                        Créer un compte
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: null,
                password: null,
                loading: false,
                errorMessage: null
            }
        },
        methods: {
            login() {
                let username = this.username;
                let password = this.password;
                if(username.length > 2 && this.password_check(password) === 1) {
                    this.loading = true
                    this.$store.dispatch("login", { username, password }, this.loading)
                        .then(response => {
                            if(response.data.enable === 0) {
                                this.errorMessage = "Votre compte na pas encore été activé."
                                this.loading = false
                            } else if(response.data.notAccount === 0) {
                                this.errorMessage = "Utilisateur non trouvé veuillez vous créer un compte."
                                this.loading = false
                            } else if(response.data.errorLogin === 0) {
                                this.errorMessage = "Votre identifiant ou mot de passe est incorrect."
                                this.loading = false
                            } else {
                                this.$router.push('/')
                                this.loading = false
                            }
                        })
                        .catch(() =>  {
                            alert('Erreur serveur')
                        });
                } else {
                    this.errorMessage = "Votre identifiant ou mot de passe est incorrect."
                }
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
        }
    }
</script>