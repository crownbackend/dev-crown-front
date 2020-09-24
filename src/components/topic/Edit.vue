<template>
  <div>
    <div class="container">
      <article class="message is-info">
        <div class="message-header">
          <p>A lire avant de poster un sujet !</p>
        </div>
        <div class="message-body">
          Le forum permet <strong>l'entraide</strong>, ne postez pas de sujet pour que les personnes trouve la solution à votre place !
          veuillez à bien chercher sur internet avant de poster un sujet, ça permet de ne pas polluer le forum.
          <br>
          Pour inserez les images veuillez d'abord télécharger l'image sur le site et récupérer le lien pour l'intégrer dans la description !
          <br>
          Pour l'upload d'images ça se passe ici : <router-link :to="{name: 'imageUpload'}" target="_blank">Telecharger des images</router-link>
        </div>
      </article>
      <div>
        <form method="post" @submit.prevent="editTopic" @change="checkFormValid">
          <div class="row">
            <div class="col-md-6">
              <div class="field">
                <label class="label">Titre</label>
                <div class="control">
                  <input class="input" type="text" v-model="title" @keyup="checkTitle" placeholder="Titre de votre sujet">
                </div>
                <p class="help is-danger" v-if="errorTitle">{{errorTitleText}}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="control">
                <label class="label">Forum</label>
                <div class="select is-fullwidth">
                  <select v-model="forum" @change="checkForum">
                    <option :value="null">Selectionnez un forum</option>
                    <option v-for="forum in forums" v-bind:key="forum.id" :value="forum.id">{{forum.name}}</option>
                  </select>
                </div>
                <p class="help is-danger" v-if="errorForum">{{errorForumText}}</p>
              </div>
            </div>
            <div class="col-md-12">
              <br>
              <div class="row">
                <div class="col-md-6">
                  <div class="field">
                    <b-checkbox v-model="close">Fermer le sujet ?</b-checkbox>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="field">
                    <b-checkbox v-model="resolve">Sujet résolut ?
                    </b-checkbox>
                  </div>
                </div>
              </div>
              <label class="label">Description</label>
              <p class="help is-danger" v-if="errorDescription">{{errorDescriptionText}}</p>
              <quill-editor style="height: 500px" @change="checkDescription" :content="description" v-model="description"/>
              <br>
              <br>
            </div>
            <div class="col-md-12">
              <br>
              <button class="button is-primary" :class="{'btn-valid': !formValid}" :disabled="!formValid">Modifier le sujet</button>
              <br>
              <br>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>


<script>
import ForumApi from "@/services/ForumApi";
import UserApi from "@/services/UserApi";

export default {
  name:"editTopic",
  data() {
    return {
      title: null,
      forums: [],
      forum: null,
      description: null,
      close: false,
      resolve: false,
      errorTitle: false,
      errorDescription: false,
      errorForum: false,
      errorTitleText: null,
      errorDescriptionText: null,
      errorForumText: null,
      formValid: true,
      userId: null
    }
  },
  created() {
    this.userId = localStorage.getItem("userId")
    UserApi.verifyToken()
        .then(response => {
          if(response.data.token_valid == 1) {
            ForumApi.getForumList()
                .then(response => {
                  this.forums = response.data
                })
                .catch(() => {
                  this.$store.dispatch('logout')
                  alert('Erreur serveur veuillez réssayer plus tard')
                })
            ForumApi.getTopic(this.$route.params.id, this.$route.params.slug)
              .then(response => {
                this.title = response.data.topic.title
                this.description = response.data.topic.description
                this.forum = response.data.topic.forum.id
                document.title = "Editer mon sujet : "+response.data.topic.title
              })
              .catch(() => {
                this.$store.dispatch('logout')
                alert('Erreur serveur veuillez réssayer plus tard')
                })
          }
        })
        .catch(() => {
          this.$store.dispatch('logout')
          alert('Erreur serveur veuillez réssayer plus tard')
          this.$router.push({name: "Login"})
        })
  },
  methods: {
    checkTitle() {
      if(this.title.length < 5) {
        this.errorTitle = true
        this.errorTitleText = "Il faut minimum 5 caractère pour le titre de votre sujet !"
      } else if(this.title.length > 5) {
        this.errorTitle = false
        this.errorTitleText = null
      }
    },
    checkForum() {
      if(!this.forum) {
        this.errorForum = true
        this.formValid = false
        this.errorForumText = "Il faut choisir un forum dans le quel vous voulez poster votre sujet !"
      } else {
        this.errorForum = false
        this.errorForumText = null
        this.formValid = true
      }
    },
    checkDescription() {
      if(this.description.length < 50) {
        this.formValid = false
        this.errorDescription = true
        this.errorDescriptionText = "Pas assez de carctères pour exprimer votre problème ! il faut minimum 50 carctères ! Si vous avez du code a exposer" +
            " utiliser l'editeur de code pour bien envlopper votre code !"
      } else if(this.description.length > 50){
        this.errorDescription = false
        this.errorDescriptionText = null
        this.formValid = true
      }
    },
    editTopic() {
      if(this.formValid) {
        ForumApi.editTopic(this.title, this.forum, this.description, this.userId,
            this.close, this.resolve, this.$route.params.id)
            .then(response => {
              console.log(response)
              if(response.data.success === 1) {
                this.$router.push({name: "showTopic", params: {slug: response.data.slug, id: response.data.topicId}})
              } else if(response.data.error) {
                this.$store.dispatch('logout')
                alert('Erreur serveur veuillez réssayer plus tard')
                this.$router.push({name: "Login"})
              }
            })
            .catch(() => {
              this.$store.dispatch('logout')
              alert('Erreur serveur veuillez réssayer plus tard')
              this.$router.push({name: "Login"})
            })
      }
    },
    checkFormValid() {
      if(!this.errorTitle && !this.errorForum && !this.errorDescription) {
        this.formValid = true
      } else {
        this.formValid = false
      }
    }
  }
}
</script>

<style>
.btn-valid {
  pointer-events: none;
  cursor: not-allowed;
}
</style>