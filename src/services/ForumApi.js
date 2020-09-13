import axios from "axios";
import Vue from "vue";

class ForumApi {
    getLastTopic() {
        return axios.get(Vue.prototype.$hostName+"/last/topics")
    }

    getForums() {
        return axios.get(Vue.prototype.$hostName+"/forum")
    }

    getForum(id, slug) {
        return axios.get(Vue.prototype.$hostName+"/forum/"+id+"/"+slug)
    }

    getLoadMoreTopics(date, id) {
        return axios.get(Vue.prototype.$hostName+"/topics/show/more/"+date+"/"+id)
    }

    getTopic(id, slug) {
        return axios.get(Vue.prototype.$hostName+"/topic/"+id+"/"+slug)
    }

    getForumList() {
        return axios.get(Vue.prototype.$hostName+"/forums/category/list")
    }

    addTopic(title, forum, description) {
        let formData = new FormData();
        formData.append("title", title)
        formData.append("forum", forum)
        formData.append("description", description)
        return axios.post(Vue.prototype.$hostName+"/topic/new", formData)
    }

    sendImages(images) {
        let formData = new FormData();
        formData.append("images", images)
        return axios.post(Vue.prototype.$hostName+"/topic/new", formData)
    }
}
export default new ForumApi();