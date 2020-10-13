<template>
  <div class="container">
    <div class="notification">
      <h1 class="subtitle is-4 has-text-centered">
        Contacter moi en cas de question sur le fonctionement du site ou si vous avez un problème technique !
      </h1>
    </div>
    <form method="post" @submit.prevent="sendForm">
      <div class="row">
        <div class="col-md-6">
          <div class="field">
            <label class="label">Nom*</label>
            <div class="control">
              <input class="input" @keyup="verifyName" v-model="name" type="text" placeholder="Nom">
            </div>
            <p class="help is-danger">{{nameMessageError}}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="field">
            <label class="label">Email*</label>
            <div class="control">
              <input class="input" @keyup="verifyEmail" v-model="email" type="text" placeholder="Email">
            </div>
            <p class="help is-danger">{{emailMessageError}}</p>
          </div>
        </div>
        <div class="col-md-12">
          <br>
          <div class="field">
            <label class="label">Message</label>
            <div class="control">
              <textarea class="textarea" @keyup="verifyMessage" v-model="message" placeholder="Textarea"></textarea>
            </div>
            <p class="help is-danger">{{messageError}}</p>
          </div>
        </div>
        <div class="col-md-12">
          <br>
          <button class="button is-dark is-outlined" :class="{'cursor': !formValid}" :disabled="!formValid">Envoyer</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ContactApi from "@/services/ContactApi";

export default {
  name: "contact",
  data() {
    return {
      name: null,
      email: null,
      message: null,
      emailMessageError: null,
      formValid: false,
      nameMessageError: null,
      messageError: null
    }
  },
  methods: {
    sendForm() {
      if(this.formValid) {
        ContactApi.sendEmail(this.email, this.name, this.message)
          .then(response => {
            if(response.data.success === 1) {
              this.$buefy.dialog.alert('Email envoyer avec success ! on reviens vers vous très prochainement !')
              this.$router.push({name: 'Home'})
            } else {
              this.$buefy.dialog.alert({
                title: 'Error',
                message: 'Problème serveur veuillez réssayer plus tard !',
                type: 'is-danger',
                hasIcon: true,
                icon: 'times-circle',
                iconPack: 'fa',
                ariaRole: 'alertdialog',
                ariaModal: true
              })
            }
          })
          .catch(() => {
            this.$buefy.dialog.alert({
              title: 'Error',
              message: 'Problème serveur veuillez réssayer plus tard !',
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
        this.emailMessageError = null
      }
    },
    verifyName() {
      if(this.name.length < 2) {
        this.nameMessageError = "Le nom d’utilisateur est trop court. Veuillez saisir au moins 2 caractères.\n";
        this.formValid = false
      } else {
        this.nameMessageError = null
      }
    },
    verifyMessage() {
      if(this.message.length < 50) {
        this.messageError = "Votre message est trop court il doit contenir minimum 50 caractères !"
        this.formValid = false
      } else {
        this.messageError = null
        this.formValid = true
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  }
}
</script>