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

    getLoadMoreVideosPlaylist(id, date) {
        let formData = new FormData()
        formData.append("date", date)
        return axios.post(Vue.prototype.$hostName+"/playlist/videos/load/more/"+id, formData)
    }
}

export default new PlaylistApi();