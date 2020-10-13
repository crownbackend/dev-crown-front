<template>
    <div class="container">
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Retrouver ici tout mes articles !
            </h1>
        </div>
      <div class="loading-overlay is-active" v-if="loading">
        <div class="loading-background"></div>
        <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
          </span>
      </div>
        <br>
        <div class="has-text-centered">
            <div class="title is-3">
                Les derniers articles
            </div>
            <div class="row" v-for="i in articlesGroups" v-bind:key="i">
                <div class="col-md-4" v-for="article in articles.slice(i * itemsPerRow, (i + 1) * itemsPerRow)" v-bind:key="article.id">
                    <div style="margin-bottom: 50px">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <router-link :to="{ name: 'showArticle', params: {slug: article.slug, id: article.id}}">
                                        <img v-bind:src="getImageUrl(article.imageFile)" :alt="article.imageFile">
                                    </router-link>
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <router-link :to="{ name: 'showArticle', params: {slug: article.slug, id: article.id}}">
                                            <p class="title is-4" :title="article.title">
                                                {{article.title.slice(0,50)}}
                                            </p>
                                        </router-link>
                                    </div>
                                </div>

                                <div class="content">
                                    <p v-html="article.metaDescription.slice(0, 80)">
                                        ...
                                    </p>
                                    <br>
                                    <time datetime="2016-1-1">{{article.publishedAt | formatDate}}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showMore">
                <button class="button is-dark" @click="getLastArticle()">Voir plus d'article</button>
            </div>
        </div>
    </div>
</template>

<script>


    import BlogApi from "../../services/BlogApi";
    import moment from "moment";

    export default {
        name: "Article",
        data() {
            return {
              itemsPerRow: 3,
              articles: [],
              showMore: false,
              loading: true
            }
        },
        mounted() {
            BlogApi.getArticles()
                .then(response => {
                    this.articles = response.data.articles
                    this.loading = false
                    if(this.articles.length > 9) {
                        this.showMore = true
                    }
                })
                .catch(() => {
                    alert('Erreur serveur !');
                })
        },
        computed: {
            articlesGroups () {
                return Array.from(Array(Math.ceil(this.articles.length / this.itemsPerRow)).keys())
            }
        },
        filters: {
            formatDate(value) {
                return moment(String(value)).fromNow()
            }
        },
        methods: {
            getImageUrl(name) {
                return this.$hostImages + "/articles/" + name;
            },
            getLastArticle() {
                let article = this.articles[this.articles.length - 1];
                BlogApi.getLastArticles(article.publishedAt)
                    .then(response => {
                        this.articles = this.articles.concat(response.data)
                        if(response.data.length === 0) {
                            this.showMore = false
                        }
                    })
                    .catch(() => {
                      alert('Erreur serveur !');
                    })
            }
        }
    }
</script>