<template>
  <div>
    <p class="help is-info" >Attention minimum 50 caractères !</p>
    <form method="post" @submit.prevent="addResponse">
      <div class="borderTextarea">
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
    <hr>
    <div v-for="response in responses" v-bind:key="response.id">
      <div class="notification">
        <figure class="image img-avatar">
          <img :src="getImageUrl(response.user.avatar, 'avatars')" :alt="response.user.avatar">
        </figure>
        <div>Ecrit par {{response.user.username}} {{response.createdAt|formatDate}}</div>
        <p v-highlightjs v-html="response.content" class="content"></p>
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
      userId: null
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId")
  },
  methods: {
    addResponse() {
      UserApi.verifyToken()
          .then(response => {
            if(response.data.token_valid == 1) {
              ForumApi.addResponse(this.description, this.userId, this.$route.params.id)
                  .then(response => {
                    console.log(response)
                    if(response.data.error) {
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