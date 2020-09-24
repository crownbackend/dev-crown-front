<template>
  <div v-if="topic">
    <hr>
    <div class="container">
      <h1 class="has-text-centered title is-2">
        {{topic.title}}
      </h1>
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
            <span class="icon-comment">
            <i class="fas fa-trash-alt"></i>
          </span>
          </span>

        </div>
        <br>
        <p v-highlightjs v-html="topic.description" class="content"></p>
      </div>
      <hr>
      <div class="title is-3">{{topic.responses.length}} Réponses</div>
      <hr>
      <div v-for="response in topic.responses" v-bind:key="response.id">
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
  </div>
</template>

<script>
  import ForumApi from "@/services/ForumApi";
  import moment from "moment";

  export default {
    name: "Topic",
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
          this.$store.dispatch('logout')
          alert('Erreur serveur veuillez réssayer plus tard')
        })
    },
    methods: {
      getImageUrl(name, docs) {
        return this.$hostImages + "/"+docs+"/" + name;
      },
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