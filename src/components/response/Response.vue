<template>
  <div>
    <div v-if="isLoggedIn">
      <p class="help is-info" >Attention minimum 50 caractères !</p>
      <form method="post" @submit.prevent="addResponse">
      <div class="borderTextarea">
        <div class="loading-overlay is-active" v-if="loading">
          <div class="loading-background"></div>
          <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
          </span>
        </div>
        <vue-pell-editor
            v-model="description"
            :placeholder="editorPlaceholder"
            default-paragraph-separator="p"
            :actions="editorOptions"
        />
      </div>
      <br>
      <button class="button is-primary">
        Ajouter
      </button>
    </form>
    </div>
    <div v-else>
      <p class="subtitle is-4">
        <router-link :to="{name: 'Register'}" class="button is-dark">
          Inscris toi
        </router-link>
        ou
        <router-link :to="{name: 'Login'}" class="button">
          Connecte toi
        </router-link>
        pour ajouter une réponse.
      </p>
    </div>
    <hr>
    <div v-for="response in responses" v-bind:key="response.id">
      <div class="notification">
        <article class="message is-success" v-if="response.resolve">
          <div class="message-header">
            <p><i class="far fa-check-circle"></i></p>
          </div>
          <div class="message-body">
            <strong>Cette réponse est la bonne.</strong>
          </div>
        </article>
        <figure class="image img-avatar">
          <img :src="getImageUrl(response.user.avatar, 'avatars')" :alt="response.user.avatar">
        </figure>
        <div>
          Ecrit par <strong>{{response.user.username}} {{response.createdAt|formatDate}}</strong>
          <span v-if="response.updatedAt">
             Dernière modification
            {{response.updatedAt|formatDate}},
          </span>
          <span v-if="isLoggedIn && getUser == response.user.id">
            <span class="icon-comment" @click.prevent="editResponse(response.id)">
              <i class="fas fa-edit"></i>
            </span>
            <span class="icon-comment" @click="deleteResponse(response.id)">
              <i class="fas fa-trash-alt"></i>
            </span>
          </span>
          <span v-if="isLoggedIn">
            <span style="float: right" @click="goodAnswer(response.id)" v-if="!response.resolve">
              <button class="button is-success is-outlined">La bonne réponse ?</button>
            </span>
          </span>
        </div>
        <p v-highlightjs v-html="response.content" class="content"></p>
        <div v-if="formEdit && response.id === responseId">
          <form @submit.prevent="sendEditResponse(response.id, response.content)" >
            <div class="borderTextarea"  style="background-color: white">
              <vue-pell-editor
                  v-model="response.content"
                  :placeholder="editorPlaceholder"
                  default-paragraph-separator="p"
                  :actions="editorOptions"
              />
            </div>
            <br/>
            <button class="button is-primary">
              Editer
            </button>
          </form>
        </div>

      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ForumApi from "@/services/ForumApi";
import UserApi from "@/services/UserApi";

export default {
  name: "response",
  props: {
    responses: Array
  },
  data() {
    return {
      description: null,
      editorPlaceholder: "Décrivez ici votre réponse, elle doit être claire et simpla !",
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
      userId: null,
      formEdit: false,
      responseId: null,
      loading: false
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId")
  },
  methods: {
    addResponse() {
      this.loading = true
      UserApi.verifyToken()
          .then(response => {
            if(response.data.token_valid == 1) {
              ForumApi.addResponse(this.description, this.userId, this.$route.params.id)
                  .then(response => {
                    if(response.data.error) {
                      this.loading = false
                      this.$buefy.dialog.alert({
                        title: 'Error',
                        message: "Attention il faut minimum 50 caractère pour rédiger une réponse !",
                        type: 'is-danger',
                        hasIcon: true,
                        icon: 'times-circle',
                        iconPack: 'fa',
                        ariaRole: 'alertdialog',
                        ariaModal: true
                      })
                    } else {
                      this.$parent.topic.responses = response.data.responses
                      this.description = null
                      this.loading = false
                    }
                  })
                  .catch(() => {
                    this.$store.dispatch('logout')
                    alert('Erreur serveur veuillez réssayer plus tard')
                    this.$router.push({name: "Login"})
                  })
            }
          })
          .catch(() => {
            this.$store.dispatch('logout')
            alert('Erreur serveur veuillez réssayer plus tard')
            this.$router.push({name: "Login"})
          })
    },
    getImageUrl(name, docs) {
      return this.$hostImages + "/"+docs+"/" + name;
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
    editResponse(id) {
      this.responseId = id
      this.formEdit = true
    },
    sendEditResponse(id, content) {
      this.loading = true
      ForumApi.editResponse(id, content, this.$route.params.id)
        .then(response => {
          if(response.data.error) {
            this.loading = false
            this.$buefy.dialog.alert({
              title: 'Error',
              message: "Attention il faut minimum 50 caractère pour rédiger une réponse !",
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa',
              ariaRole: 'alertdialog',
              ariaModal: true
            })
          } else {
            this.$parent.topic.responses = response.data.responses
            this.formEdit = false
            this.loading = false
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
            this.$router.push({name: "Login"})
          })
    },
    deleteResponse(id) {
      if(confirm('Voulez vous vraiment supprimer ce commentaire ?')) {
        ForumApi.deleteResponse(id)
          .then(response => {
            this.$parent.topic.responses = response.data.responses
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
              this.$router.push({name: "Login"})
            })
      }
    },
    goodAnswer(id) {
      ForumApi.goodAnswer(id)
        .then(response => {
          this.$parent.topic.responses = response.data.responses
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
            this.$router.push({name: "Login"})
          })
    }
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
    getUser() {
      return localStorage.getItem("userId")
    }
  },
  filters: {
    formatDate(value) {
      return moment(value).fromNow()
    }
  },
}
</script>

<style scoped>
.pell-content{
  height: 100px !important;
}
</style>