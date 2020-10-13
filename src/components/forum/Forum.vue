<template>
  <div class="container">
    <h1 class="subtitle is-4 has-text-centered notification">
      Bienvenue sur le forum de Dev-crown.com,
      ici posez toute vos questions en rapport avec le developpement web et les nouvelles technologies.
    </h1>
    <div class="loading-overlay is-active" v-if="loading">
      <div class="loading-background"></div>
      <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
      </span>
    </div>
    <br>
    <br>
    <div v-for="forum in forums" v-bind:key="forum.id">
      <div class="row">
      <div class="col-md-2">
        <figure class="image is-128x128">
          <img v-bind:src="getImageForum(forum.imageFile)">
        </figure>
      </div>
      <div class="col-md-4">
        <div class="subtitle is-3">
          <router-link :to="{ name: 'showForum', params: {id: forum.id, slug: forum.slug}}">
            {{forum.name}}
          </router-link>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12" v-if="forum.topics.length <= 1">
            {{ forum.topics.length }} Sujet
          </div>
          <div class="col-md-12" v-else>
            {{ forum.topics.length }} Sujets
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div v-for="topic in forum.topics.slice(-1)" v-bind:key="topic.id">
          <router-link :to="{name: 'showTopic', params: {slug: topic.slug, id: topic.id}}">
            {{topic.title}}
          </router-link>
        </div>
      </div>
    </div>
      <hr>
    </div>
  </div>
</template>

<script>
  import ForumApi from "@/services/ForumApi";

  export default {
    name: "Forum",
    data() {
      return {
        forums: null,
        lastTopic: null,
        loading: true
      }
    },
    created() {
      ForumApi.getForums()
        .then(response => {
          this.forums = response.data.forums
          this.loading = false
        })
        .catch(() => {
          alert("Erreur serveur !")
        })
    },
    methods: {
      getImageForum(name) {
        return this.$hostImages + "/forum/" + name;
      }
    }
  }
</script>