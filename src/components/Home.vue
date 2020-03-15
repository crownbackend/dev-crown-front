<template>
    <div>
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Partez à la découverte du développement web avec un contenu éllaboré pour tous, gratuitement !
            </h1>
        </div>
        <br>
        <div class="has-text-centered">
            <div class="title is-3">
                Les dernières vidéos
            </div>
            <div class="columns">
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://picsum.photos/1280/960" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">symfony 5 présentation du projet</p>
                                    <p class="subtitle is-6">Dev-crown</p>
                                </div>
                            </div>

                            <div class="content">
                                Bonjour à tous dans cette vidéo nous allons voir comment utiliser les formulaires avec doctrine !

                                <br>
                                <time datetime="2016-1-1">13/03/2020</time>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://picsum.photos/1280/960" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">symfony 5 présentation du projet</p>
                                    <p class="subtitle is-6">Dev-crown</p>
                                </div>
                            </div>

                            <div class="content">
                                Bonjour à tous dans cette vidéo nous allons voir comment utiliser les formulaires avec doctrine !

                                <br>
                                <time datetime="2016-1-1">13/03/2020</time>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://picsum.photos/1280/960" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">symfony 5 présentation du projet</p>
                                    <p class="subtitle is-6">Dev-crown</p>
                                </div>
                            </div>

                            <div class="content">
                                Bonjour à tous dans cette vidéo nous allons voir comment utiliser les formulaires avec doctrine !

                                <br>
                                <time datetime="2016-1-1">13/03/2020</time>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>

        <div class="has-text-centered notification">
            <div class="title is-3">
                Le blog
            </div>
            <div class="columns">
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://picsum.photos/1280/960" alt="Placeholder image">
                            </figure>
                        </div>
                        <br>
                        <time datetime="2016-1-1">13/03/2020</time>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4 has-text-centered">
                                        PHP est il amener a mourir ?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://picsum.photos/1280/960" alt="Placeholder image">
                            </figure>
                        </div>
                        <br>
                        <time datetime="2016-1-1">13/03/2020</time>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4 has-text-centered">
                                        PHP est il amener a mourir ?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="https://picsum.photos/1280/960" alt="Placeholder image">
                            </figure>
                        </div>
                        <br>
                        <time datetime="2016-1-1">13/03/2020</time>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4 has-text-centered">
                                        PHP est il amener a mourir ?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>


        <div class="has-text-centered">
            <div class="title is-3">
                Le Forum
            </div>
            <table class="table">
                <thead>
                <tr>
                    <th>Résolut</th>
                    <th>Forum</th>
                    <th>Sujet</th>
                </tr>
                </thead>
                <tbody>
                   <tr v-for="data in datas" v-bind:key="data.subject">
                       <td v-if="data.resolve === 1">
                           <i class="fas fa-check-circle"></i>
                       </td>
                       <td v-else>
                           <i class="far fa-circle"></i>
                       </td>
                       <td>
                           <router-link to="/">
                            {{data.forum}}
                           </router-link>
                       </td>
                       <td>
                           <router-link to="/">
                               {{data.subject}}
                           </router-link>
                       </td>
                   </tr>
                </tbody>
            </table>
        </div>
        <br>

    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                datas: [
                    {"resolve": 0, "forum": "javascript", "subject": "Vue js nuxt ?"},
                    {"resolve": 1, "forum": "php", "subject": "symfony works"},
                    {"resolve": 0, "forum": "SQL", "subject": "Jointure de rêquete ?"},
                    {"resolve": 0, "forum": "HTML", "subject": "H1 question ?"},
                    {"resolve": 0, "forum": "CSS", "subject": "Color"},
                    {"resolve": 1, "forum": "CSS", "subject": "Color"},
                ]
            }
        }
    }
</script>

<style scoped>
    .notification {
        background-color: #D2D2D2;
    }

    .table {
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    }
</style>