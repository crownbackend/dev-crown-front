<template>
    <div>
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Retrouver ici tout mes articles !
            </h1>
        </div>
        <br>
        <div class="has-text-centered">
            <div class="title is-3">
                Les derniers articles
            </div>
            <div class="columns" v-for="i in articlesGroups" v-bind:key="i">
                <div class="column" v-for="article in articles.slice(i * itemsPerRow, (i + 1) * itemsPerRow)" v-bind:key="article.id">
                    <div class="column">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <a href="">
                                        <img v-bind:src="getImageUrl(article.imageFile)" :alt="article.imageFile">
                                    </a>
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                        <a href="">
                                            <p class="title is-4" :title="article.title">
                                                {{article.title.slice(0,50)}}
                                            </p>
                                        </a>
                                        <br>
                                        <p class="subtitle is-6">Dev-crown</p>
                                    </div>
                                </div>

                                <div class="content">
                                    <p v-html="article.description.slice(0, 80)">
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
            }
        },
        mounted() {
            BlogApi.getArticles()
                .then(response => {
                    this.articles = response.data.articles
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
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        },
        methods: {
            getImageUrl(name) {
                return this.$hostImages + "/articles/" + name;
            }
        }
    }
</script>