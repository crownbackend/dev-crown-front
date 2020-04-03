<template>
    <div>
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Retrouver ici toutes les technologies
            </h1>
        </div>
        <div class="row">
            <div class="col-md-4" v-for="technology in technologies" v-bind:key="technology.id">
            <br>
                <div class="card" >
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <router-link :to="{ name: 'showTechnology', params: {slug: technology.slug, id: technology.id}}">
                                    <figure class="image is-128x128">
                                        <img :src="getImageTechnoUrl(technology.imageFile)" alt="Placeholder image">
                                    </figure>
                                </router-link>
                            </div>
                        </div>
                        <div class="title">
                            <router-link :to="{ name: 'showTechnology', params: {slug: technology.slug, id: technology.id}}">
                                {{technology.name}}
                            </router-link>
                        </div>
                        <p class="subtitle">
                            {{technology.description}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
    import TechnologyApi from "../../services/TechnologyApi";

    export default {
        name: "Technology",
        data() {
            return {
                technologies: [],
            }
        },
        mounted() {
            TechnologyApi.getTechnologies()
                .then(response => {
                    this.technologies = response.data.technologies
                })
                .catch(() => {
                    alert('Erreur serveur !')
                })
        },
        methods: {
            getImageTechnoUrl(name) {
                return this.$hostImages + "/technology/" + name;
            }
        }
    }
</script>