<template>
  <div>
    <hr>
    <div class="container">
      <h1 class="title is-2 has-text-centered">Télécharger vos images pour les afficher sur le forum !</h1>
      <br>
      <article class="message is-info">
        <div class="message-header">
          <p>A lire avant de poster des images !</p>
        </div>
        <div class="message-body">
          Cette section permet de télécharger des images sur le site pour ensuite les utiliser sur le forum !
          <br>
          <strong>Attention vous avez le droit de télécharger 5 images par upload, chaque image ne doit pas dépasser les 5MO, tout abus sera punis.</strong>
        </div>
      </article>
      <div>
        <form method="post" @submit.prevent="sendImages" @change="checkFormValid">
          <div class="file is-boxed">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" multiple @change="handleSelects" accept="image/*">
              <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choisir les images !
              </span>
            </span>
            </label>
          </div>
        <br>
          <div v-for="image in images" v-bind:key="image">
            <img :src="image" class="preview">
          </div>
          <button class="button is-primary" :disabled="!formValid">Envoyer les images</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";
import ForumApi from "@/services/ForumApi";

export default {
  name: "imageUpload",
  data() {
    return {
      images: [],
      formValid: false
    }
  },
  mounted() {
    UserApi.verifyToken()
      .then(response => {
        if(response.data.token_valid == 1) {
          console.log("")
        }
      })
        .catch(() => {
          this.$store.dispatch('logout')
          alert('Erreur serveur veuillez réssayer plus tard')
          this.$router.push({name: "Login"})
        })
  },
  methods: {
    checkFormValid() {
      if(this.images) {
        this.formValid = true
      }
    },
    sendImages() {
      ForumApi.sendImages(this.images)
        .then(response => {
          console.log(response)
        })
        .catch(console.error)
    },
    handleSelects(e) {
      this.images = [];
      let fileList = Array.prototype.slice.call(e.target.files);
      fileList.forEach(f => {
        if(!f.type.match("image.*")) {
          return;
        }
        let reader = new FileReader();
        let that = this;
        reader.onload = function (e) {
          that.images.push(e.target.result);
        }
        reader.readAsDataURL(f);
      });
    }
  }
}
</script>

<style>
img.preview {
  max-width:500px;
  max-height:500px;
}
</style>