<template>
  <div>
    <hr>
    <div class="container">
      <h1 class="title is-2 has-text-centered">Vos images télécharger sur le forum</h1>
      <div class="modal" :class="{'is-active': active}">
        <div class="modal-background" @click="closeModal()"></div>
        <div class="modal-content">
          <p class="image is-4by3">
            <img :src="showImage" class="img-fluid" :alt="showImage">
          </p>
        </div>
        <button class="modal-close is-large" @click="closeModal()" aria-label="close"></button>
      </div>

      <div class="scroller">
        <div v-if="userImages" class="subtitle is-2 has-text-centered">Aucune images</div>
        <div v-for="image in userImages" v-bind:key="image.id">
          <div>
            Cliquer sur l'image pour la voir : <a href="#" @click="imageShow(image.name)">
            {{image.name}}
          </a>
            <br>
            Lien à copier dans la description du sujet : <strong @click="select(linkImage(image.name))">{{linkImage(image.name)}}</strong>
            <div style="float: right;">
              <i class="fas fa-trash-alt fa-lg fa-cog" @click="deleteImage(image.id)"></i>
            </div>
          </div>
          <hr>
        </div>
      </div>
      <br>
      <hr>
      <div v-if="imageNotUpload">
        <article class="message is-danger">
          <div class="message-header">
            <p>Erreur !</p>
          </div>
          <div class="message-body">
            Tous les images on été télécharger sauf celle ci car elle font plus de 5Mo :
            <div v-for="image in imagesError" v-bind:key="image">
              <strong>
                {{image}}
              </strong>
            </div>
          </div>
        </article>
      <br>
      </div>
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
              <input class="file-input" type="file" ref="file" name="resume" multiple @change="handleSelects" accept="image/*">
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
import Vue from "vue";

export default {
  name: "imageUpload",
  data() {
    return {
      images: [],
      formValid: false,
      files: null,
      userImages: [],
      imagesError: [],
      imageNotUpload: false,
      userId: null,
      showImage: null,
      active: false
    }
  },
  created() {
    this.userId = localStorage.getItem("userId")
    UserApi.verifyToken()
      .then(response => {
        if(response.data.token_valid == 1) {
          ForumApi.getImagesUser(this.userId)
            .then(response => {
              this.userImages = response.data.images
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
  methods: {
    checkFormValid() {
      if(this.images) {
        this.formValid = true
      }
    },
    sendImages() {
      ForumApi.sendImages(this.files)
        .then(response => {
          if(response.data.success === 1) {
            this.images = [];
            this.userImages = response.data.images
            this.$buefy.notification.open({
              message: 'Images télécharger avec success!',
              type: 'is-success'
            })
          }
          if(response.data.imagesNotUpload.length > 0) {
            this.imageNotUpload = true
            this.imagesError = response.data.imagesNotUpload
          }
        })
        .catch((err) => {
          if(err.response.data.errorCountFile === 1) {
            this.$buefy.dialog.alert({
              title: 'Error',
              message: "Attention vous avez uploader plus de 5 images a la fois !",
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa',
              ariaRole: 'alertdialog',
              ariaModal: true
            })
            this.images = null
          } else {
            this.$store.dispatch('logout')
            alert('Erreur serveur veuillez réssayer plus tard')
            this.$router.push({name: "Login"})
          }
        })
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
      let formData = new FormData();
      formData.append("id", this.userId)
      for( var i = 0; i < this.$refs.file.files.length; i++ ){
        let file = this.$refs.file.files[i];
        formData.append('files[' + i + ']', file);
      }
      this.files = formData
    },
    linkImage(image) {
      return Vue.prototype.$hostImages + "/topics/"+ image
    },
    imageShow(image) {
      this.showImage = Vue.prototype.$hostImages + "/topics/"+ image
      this.active = true
    },
    closeModal() {
      this.active = false
      this.showImage = null
    },
    deleteImage(id) {
      if(confirm("Ce ci va supprimer l'image et en conséquence elle ne sera plus visible dans votre sujet sur le forum?")) {
        ForumApi.deleteImage(id, this.userId)
            .then(response => {
              this.userImages = response.data.images
            })
            .catch(() => {
              this.$store.dispatch('logout')
              alert('Erreur serveur veuillez réssayer plus tard')
              this.$router.push({name: "Login"})
            })
      }
    },
    select: function(img){
      navigator.clipboard.writeText(img)
      this.$buefy.notification.open({
        message: 'Lien de l\'image copié dans le press papier!',
        type: 'is-success'
      })
    }
  }
}
</script>

<style>
img.preview {
  max-width:500px;
  max-height:500px;
}
.scroller {
  height: 500px;
  overflow-y: scroll;
}

.fa-cog {
  color: hsl(348, 100%, 61%);
  cursor: pointer;
}

</style>