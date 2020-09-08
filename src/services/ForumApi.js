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
}
export default new ForumApi();