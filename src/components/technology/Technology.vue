<template>
    <div class="container">
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Retrouvez ici toutes les technologies
            </h1>
        </div>
      <div class="loading-overlay is-active" v-if="loading">
        <div class="loading-background"></div>
        <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
          </span>
      </div>
        <div class="row">
            <div class="col-md-4" style="padding-bottom: 20px" v-for="technology in technologies" v-bind:key="technology.id">
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
        <div class="has-text-centered show-more" v-if="showMore">
            <button class="button is-dark" @click="getLoadTechnologies()">Voir plus de vidéos</button>
        </div>
    </div>
</template>

<script>
    import TechnologyApi from "../../services/TechnologyApi";

    export default {
        name: "Technology",
        data() {
            return {
              technologies: [],
              showMore: false,
              loading: true
            }
        },
        created() {
            TechnologyApi.getTechnologies()
                .then(response => {
                    this.technologies = response.data.technologies
                    this.loading = false
                    if(this.technologies.length > 8) {
                        this.showMore = true
                    }
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
            getImageTechnoUrl(name) {
                return this.$hostImages + "/technology/" + name;
            },
            getLoadTechnologies() {
                let technology = this.technologies[this.technologies.length -1 ];
                TechnologyApi.getLastTechnologies(technology.id)
                    .then(response => {
                        this.technologies = this.technologies.concat(response.data)
                        if(response.data.length === 0) {
                            this.showMore = false
                        }
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
            }
        }
    }
</script>