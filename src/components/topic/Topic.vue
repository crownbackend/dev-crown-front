<template>
  <div v-if="topic">
    <hr>
    <div class="container">
      <h1 class="has-text-centered title is-2">
        {{topic.title}}
      </h1>
      <article class="message is-success" v-if="topic.resolve">
        <div class="message-header">
          <p><i class="far fa-check-circle"></i></p>
        </div>
        <div class="message-body">
           <strong>Ce sujet est résolu.</strong>
        </div>
      </article>
      <article class="message is-danger" v-if="topic.close">
        <div class="message-header">
          <p><i class="far fa-times-circle"></i></p>
        </div>
        <div class="message-body">
          <strong>Attention ce sujet est fermer veuillez consulter un autre sujet ou en créer un nouveau.</strong>
        </div>
      </article>
      <div class="notification">
        <figure class="image img-avatar">
          <img :src="getImageUrl(topic.user.avatar, 'avatars')" :alt="topic.user.avatar">
        </figure>
        <div>
          Ecrit par <span class="time">{{topic.user.username}}</span>
          <span class="time">{{topic.createdAt|formatDate}}</span>
          <span class="time" v-if="topic.updatedAt">, dernière modification {{topic.updatedAt|formatDate}}</span>
          <span v-if="isLoggedIn && getUser == topic.user.id">
            <span class="icon-comment">
              <router-link :to="{name: 'editTopic', params: {id: topic.id, slug: topic.slug}}">
                <i class="fas fa-edit"></i>
              </router-link>
            </span>
            <span class="icon-comment" @click="deleteTopic(topic.id)">
              <i class="fas fa-trash-alt"></i>
            </span>
          </span>

        </div>
        <br>
        <p v-highlightjs v-html="topic.description"></p>
      </div>
      <hr>
      <div class="title is-3">{{topic.responses.length}} Réponses</div>
      <Response :responses="topic.responses"/>
    </div>
  </div>
  <div v-else>
    <div class="loading-overlay is-active">
      <div class="loading-background"></div>
      <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
          </span>
    </div>
  </div>
</template>

<script>
  import ForumApi from "@/services/ForumApi";
  import moment from "moment";
  import Response from "@/components/response/Response";

  export default {
    name: "Topic",
    components: {Response},
    data() {
      return {
        topic: null
      }
    },
    created() {
      ForumApi.getTopic(this.$route.params.id, this.$route.params.slug)
        .then(response => {
          this.topic = response.data.topic
          document.title = response.data.topic.title
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
    },
    methods: {
      getImageUrl(name, docs) {
        return this.$hostImages + "/"+docs+"/" + name;
      },
      deleteTopic(id) {
        if(confirm('Voulez vous vraiment supprimer le Topic ?')) {
          ForumApi.deleteTopic(id)
              .then(response => {
                if(response.data.success === 1) {
                  this.$buefy.notification.open({
                    message: 'Topic supprimer avec succées',
                    type: 'is-success'
                  })
                  this.$router.push({name: "Home"})
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
              })
        }
      }
    },
    filters: {
      formatDate(value) {
        return moment(value).fromNow()
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
  }
</script>

<style>
.img-avatar {
  width: 50px;
  height: 50px;
}
.notification {
  background-color: #D2D2D2;
}
.time {
  font-size: 0.8rem;
  font-weight: bold;
}

.icon-comment {
  margin-left: 10px;
  cursor: pointer;
}
</style>