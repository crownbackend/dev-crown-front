import axios from "axios";
import Vue from "vue";

class PlaylistApi {
    getPlaylists() {
        return axios.get(Vue.prototype.$hostName+"/playlists")
    }

    getLoadMorePlaylists(id) {
        return axios.get(Vue.prototype.$hostName+"/playlists/load/more/"+id)
    }

    getPlaylist(slug, id) {
        return axios.get(Vue.prototype.$hostName+"/playlist/"+slug+"/"+id)
    }
}

export default new PlaylistApi();