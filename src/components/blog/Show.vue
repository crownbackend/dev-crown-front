<template>
    <div class="container" v-if="article">
        <div>
            <br>
            <h1 class="title is-2">{{article.title}}</h1>
            <br>
            <figure>
                <img :src="getImageUrl(article.imageFile)" :alt="article.imageFile">
            </figure>
            <hr>
            <div>
                <span class="subtitle is-5">
                    Partager la vidéo :
                </span>
                <span class="share">
                  <ShareNetwork
                      network="facebook"
                      :url="urlShare"
                      :title="article.title"
                  >
                    <i class="fab fa-facebook-square fa-3x" style="color: #3b5998"></i>
                  </ShareNetwork>
                </span>
                <span class="share">
                   <ShareNetwork
                       network="twitter"
                       :url="urlShare"
                       :title="article.title"
                   >
                    <i class="fab fa-twitter-square fa-3x" style="color: #00acee"></i>
                   </ShareNetwork>
                </span>
                <span class="share">
                  <ShareNetwork
                      network="email"
                      :url="urlShare"
                      :title="article.title"
                  >
                    <i class="fas fa-envelope-square fa-3x"></i>
                  </ShareNetwork>
                </span>
                <span style="float: right">
                    <span class="subtitle is-4 separe">
                       {{article.publishedAt | formatDate}}
                    </span>
                </span>
            </div>
            <hr>
            <div class="separe-content">
                <p v-highlightjs v-html="article.description">
                </p>
            </div>
            <hr>
            <br>
            <Comment/>
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
    import Comment from "../comment/Comment";
    import BlogApi from "../../services/BlogApi";
    import moment from "moment";
    import Vue from "vue";
    export default {
        name: "Show",
        components: {Comment},
        data() {
            return {
              article: null,
              loading: true,
              urlShare: null
            }
        },
        mounted() {
          this.urlShare = Vue.prototype.$hostFront + this.$router.currentRoute.path
            BlogApi.getArticle(this.$route.params.slug, this.$route.params.id)
                .then(response => {
                    this.article = response.data
                    document.title = response.data.title
                    document.querySelector('meta[name="description"]').setAttribute("content", response.data.metaDescription.slice(0, 155));
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
            getImageUrl(name) {
                return this.$hostImages + "/articles/" + name;
            },
        },
        filters: {
            formatDate(value) {
                return moment(value).fromNow()
            }
        },
    }
</script>

<style>
    .separe {
        margin-right: 15px;
        margin-left: 15px;
    }
    .separe-content{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .share {
        margin-left: 10px;
        cursor: pointer;
    }
</style>