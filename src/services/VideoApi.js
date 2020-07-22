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

    getLoadVideos(date) {
        this.date = date
        let formData = new FormData();
        formData.append("date", this.date)
        return axios.post(Vue.prototype.$hostName+"/videos/load/more", formData)
    }

    addFavored(userId, videoId) {
        let formData = new FormData();
        formData.append("userId", userId)
        formData.append("videoId", videoId)

        return axios.post(Vue.prototype.$hostName+"/videos/add/favored", formData)
    }

    removeFavored(userId, videoId) {
        let formData = new FormData();
        formData.append("userId", userId)
        formData.append("videoId", videoId)

        return axios.post(Vue.prototype.$hostName+"/videos/remove/favored", formData)
    }
}

export default new VideoApi();