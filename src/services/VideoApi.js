import axios from "axios";
import Vue from "vue";

class VideoApi {

    getVideos() {
        return axios.get(Vue.prototype.$hostName+"/videos")
    }

    getLastVideos() {
        return axios.get(Vue.prototype.$hostName+"/last/videos")
    }
}

export default new VideoApi();