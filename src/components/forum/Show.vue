<template>
  <div v-if="forum">
    <br>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <figure class="image is-128x128">
            <img v-bind:src="getImageForum(forum.imageFile)" :alt="forum.imageFile">
          </figure>
        </div>
        <div class="col-md-2">
          <div class="subtitle is-3">
            {{forum.name}}
          </div>
        </div>
        <div class="col-md-4">
          <div class="subtitle is-5">
            {{forum.description}}
          </div>
        </div>
        <div class="col-md-4">
          <button class="button is-dark" @click="redirectAddTopic()">Ajouter un sujet</button>
        </div>
      </div>
    </div>
    <hr>
    <div class="container">
      <div class="has-text-centered">
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>Résolut</th>
            <th>Fermer</th>
            <th>Sujets</th>
            <th>Réponses</th>
            <th>Dernier message</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="topic in topics" v-bind:key="topic.id">
            <td title="Sujet Résolu" v-if="topic.resolve == 1">
              <i class="fas fa-check-circle success"></i>
            </td>
            <td v-else title="Non résolu">
              <i class="far fa-circle"></i>
            </td>
            <td v-if="topic.close == 1">
              <i class="far fa-times-circle danger"></i>
            </td>
            <td v-else>
            </td>
            <td>
              <router-link :to="{name: 'showTopic', params: {slug: topic.slug, id: topic.id}}">
                {{topic.title}}
              </router-link>
              <br>
              <div class="time">
                {{topic.createdAt|formatDate}}
              </div>
            </td>
            <td>
              {{topic.responses.length}}
            </td>
            <td v-for="response in topic.responses.slice(-1)" v-bind:key="response.id">
              {{response.user.username}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="has-text-centered plus" v-if="showMore">
        <button class="button is-dark" @click="showMoreTopics()">Voir plus de sujets</button>
      </div>
    </div>
  </div>
</template>

<script>
  import ForumApi from "@/services/ForumApi";
  import moment from "moment";

  export default {
    name: "show",
    data() {
      return {
        forum: null,
        topics: [],
        showMore: null
      }
    },
    created() {
      ForumApi.getForum(this.$route.params.id, this.$route.params.slug)
        .then(response => {
          this.forum = response.data.forum
          this.topics = response.data.topics
          if(this.topics.length >= 10) {
            this.showMore = true
          }
          document.title = response.data.forum.name
        })
        .catch(() => {
          alert("Erreur serveur !")
        })
    },
    methods: {
      getImageForum(name) {
        return this.$hostImages + "/forum/" + name;
      },
      showMoreTopics() {
        ForumApi.getLoadMoreTopics(this.topics[this.topics.length - 1].createdAt, this.$route.params.id)
          .then(response => {
            this.topics = this.topics.concat(response.data.topics)
            if(response.data.topics.length === 0) {
              this.showMore = false
            }
          })
          .catch(() => {
            alert("Erreur serveur !")
          })
      },
      redirectAddTopic() {
        if(!localStorage.getItem('token')) {
          this.$buefy.notification.open('Il faut être connecté pour ajouter un nouveau sujet !')
        } else {
          this.$router.push({name: "addTopic", query: {forum: this.$route.params.id}})
        }
      }
    },
    filters: {
      formatDate(value) {
        return moment(value).fromNow()
      }
    }
  }
</script>

<style>
  .time {
    font-size: 0.8rem;
    font-weight: bold;
  }
  .plus {
    padding-bottom: 15px;
    padding-top: 15px;
  }
</style>