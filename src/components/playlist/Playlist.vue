<template>
    <div class="container">
        <div class="notification">
            <h1 class="subtitle is-4 has-text-centered">
                Retrouver ici toutes mes playlistes Youtube
            </h1>
        </div>
      <div class="loading-overlay is-active" v-if="loading">
        <div class="loading-background"></div>
        <span class="icon is-large">
            <i class="fas fa-sync-alt fa-2x fa-spin"></i>
          </span>
      </div>
        <div class="row">
            <div class="col-md-4" style="padding-bottom: 30px" v-for="playlist in playlists" v-bind:key="playlist.id">
                <div class="card" >
                    <div class="card-content">
                        <div class="title">
                            <router-link :to="{ name: 'showPlaylist', params: {slug: playlist.slug, id: playlist.id}}">
                                {{playlist.name}}
                            </router-link>
                        </div>
                        <p class="subtitle">
                            {{playlist.description}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="has-text-centered show-more" v-if="showMore">
            <button class="button is-dark" @click="getLoadPlaylist()">Voir plus de playlistes</button>
        </div>
    </div>
</template>

<script>
    import PlaylistApi from "../../services/PlaylistApi";

    export default {
        name: "Playlist",
        data() {
            return {
              playlists: [],
              showMore: false,
              loading: true
            }
        },
        mounted() {
            PlaylistApi.getPlaylists()
                .then(response => {
                    this.playlists = response.data.playlists
                    this.loading = false
                    if(this.playlists.length > 9) {
                        this.showMore = true
                    }
                })
                .catch(() => {
                  alert('Erreur serveur !');
                })
        },
        methods: {
            getLoadPlaylist() {
                let playlist = this.playlists[this.playlists.length - 1];
                PlaylistApi.getLoadMorePlaylists(playlist.id)
                    .then(response => {
                        this.playlists = this.playlists.concat(response.data)
                        if(response.data.length === 0) {
                            this.showMore = false
                        }
                    })
                    .catch(() => {
                        alert('Erreur serveur !')
                    })
            }
        }
    }
</script>