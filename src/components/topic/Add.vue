<template>
  <div>
    <div class="container">
      <div class="loading-overlay is-active" v-if="loading">
        <div class="loading-background"></div>
        <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
      </span>
      </div>
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
        <form method="post" @submit.prevent="addTopic" @change="checkFormValid">
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
              <label class="label">Description</label>
              <p class="help is-info">{{errorDescriptionText}}</p>
              <div class="borderTextarea">
                <vue-pell-editor
                    v-model="description"
                    :placeholder="editorPlaceholder"
                    default-paragraph-separator="p"
                    :style-with-css="true"
                    :actions="editorOptions"
                />
              </div>
              <br>
            </div>
            <div class="col-md-12">
              <button class="button is-primary" :class="{'btn-valid': !formValid}" :disabled="!formValid">Créer le sujet</button>
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
import UserApi from "@/services/UserApi";
import ForumApi from "@/services/ForumApi";

export default {
  name: "addTopic",
  data() {
    return {
      title: null,
      forums: [],
      forum: null,
      description: null,
      errorTitle: false,
      errorForum: false,
      errorTitleText: null,
      errorDescriptionText: "Il faut minimum 50 caractère !",
      errorForumText: null,
      formValid: false,
      userId: null,
      editorPlaceholder: "Décrivez ici votre code ou ce que vous cherchez à faire",
      editorOptions: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'paragraph',
        'code',
        'line',
        {
          name: 'image',
          result: () => {
            const url = window.prompt('Enter the image URL')
            if (url) window.pell.exec('insertImage', this.ensureHTTP(url))
          }
        },
        {
          name: 'link',
          result: () => {
            const url = window.prompt('Enter the link URL')
            if (url) window.pell.exec('createLink', this.ensureHTTP(url))
          }
        }
      ],
      loading: false
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId")
    UserApi.verifyToken()
        .then(response => {
          if(response.data.token_valid == 1) {
            ForumApi.getForumList()
                .then(response => {
                  this.forums = response.data
                  if(this.$route.query.forum) {
                    this.forum = this.$route.query.forum
                  }
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
      if(this.title && this.title.length < 5) {
        this.errorTitle = true
        this.errorTitleText = "Il faut minimum 5 caractère pour le titre de votre sujet !"
      } else if(this.title && this.title.length > 5) {
        this.errorTitle = false
        this.errorTitleText = null
      }
    },
    checkForum() {
      if(!this.forum) {
        this.errorForum = true
        this.errorForumText = "Il faut choisir un forum dans le quel vous voulez poster votre sujet !"
      } else {
        this.errorForum = false
        this.errorForumText = null
      }
    },
    addTopic() {
      if(this.formValid) {
        this.loading = true
        ForumApi.addTopic(this.title, this.forum, this.description, this.userId)
          .then(response => {
            if(response.data.success === 1) {
              this.loading = false
              this.$router.push({name: "showTopic", params: {slug: response.data.slug, id: response.data.topicId}})
            } else if(response.data.error) {
              this.loading = false
              this.$buefy.dialog.alert({
                title: 'Error',
                message: 'Attention votre sujet nest pas complet !' +
                    'Pour rappelle le titre doit contenir minimum 5 caractères ! <br/>' +
                    'La description minimum 50 caractères et choisir un forum',
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
              this.$store.dispatch('logout')
              alert('Erreur serveur veuillez réssayer plus tard')
              this.$router.push({name: "Login"})
            })
      }
    },
    checkFormValid() {
      if(!this.errorTitle && !this.errorForum) {
        this.formValid = true
      } else {
        this.formValid = false
      }
    },
    ensureHTTP(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      if(pattern.test(str)) {
        return str
      } else {
        return this.$buefy.dialog.alert({
          title: 'Error',
          message: "Attention URL non valide !",
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true
        })
      }
    },
  }
}
</script>

<style>
  .btn-valid {
    pointer-events: none;
    cursor: not-allowed;
  }
  .pell-content{
    height: 1000px;
  }
</style>