import axios from "axios";
import Vue from "vue";

class VideoApi {

    getVideos() {
        return axios.get(Vue.prototype.$hostName+"/videos")
    }

    getLastVideos() {
        return axios.get(Vue.prototype.$hostName+"/last/videos")
    }

    getVideo(slug, id) {
        this.id = id
        this.slug = slug
        return axios.get(Vue.prototype.$hostName+"/video/"+slug+"/"+id)
    }
}

export default new VideoApi();