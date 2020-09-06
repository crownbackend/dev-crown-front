<template>
  <div v-if="forum">
    <br>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <figure class="image is-128x128">
            <img v-bind:src="getImageForum(forum.imageFile)">
          </figure>
        </div>
        <div class="col-md-2">
          <div class="subtitle is-3">
            {{forum.name}}
          </div>
        </div>
        <div class="col-md-6">
          <div class="subtitle is-5">
            {{forum.description}}
          </div>
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
            <th>Sujets</th>
            <th>Réponses</th>
            <th>Dernier message</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="topic in forum.topics" v-bind:key="topic.id">
            <td v-if="topic.resolve == 1">
              <i class="fas fa-check-circle"></i>
            </td>
            <td v-else>
              <i class="far fa-circle"></i>
            </td>
            <td>
              <router-link to="/">
                {{topic.title}}
              </router-link>
            </td>
            <td>
              4
            </td>
            <td>last</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import ForumApi from "@/services/ForumApi";

  export default {
    name: "show",
    data() {
      return {
        forum: null
      }
    },
    created() {
      ForumApi.getForum(this.$route.params.id)
        .then(response => {
          console.log(response)
          this.forum = response.data
          document.title = response.data.name
        })
        .catch(console.error)
    },
    methods: {
      getImageForum(name) {
        return this.$hostImages + "/forum/" + name;
      }
    }
  }
</script>