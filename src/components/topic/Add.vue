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
          Pour l'upload d'images ça se passe ici : <a href="">Telecharger des images</a>
        </div>
      </article>
      <div>
        <div class="row">
          <div class="col-md-6">
            <div class="field">
              <label class="label">Titre</label>
              <div class="control">
                <input class="input" type="text" v-model="title" placeholder="Titre de votre sujet">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="control">
              <label class="label">Forum</label>
              <div class="select is-fullwidth">
                <select v-model="forum">
                  <option :value="null">Selectionnez un forum</option>
                  <option v-for="forum in forums" v-bind:key="forum.id" :value="forum.id">{{forum.name}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <br>
              <label class="label">Description</label>
              <quill-editor style="height: 250px" :content="description" v-model="description"/>
            <br>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";
import ForumApi from "@/services/ForumApi";

export default {
  name: "add",
  data() {
    return {
      title: null,
      forums: [],
      forum: null,
      description: null
    }
  },
  created() {
    UserApi.verifyToken()
        .then(response => {
          if(response.data.token_valid == 1) {
            console.log("oke")
          }
        })
        .catch(() => {
          this.$store.dispatch('logout')
          alert('Erreur serveur veuillez réssayer plus tard')
        })
    ForumApi.getForumList()
      .then(response => {
        this.forums = response.data
      })
      .catch(console.error)
  }
}
</script>