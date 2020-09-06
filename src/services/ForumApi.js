import axios from "axios";
import Vue from "vue";

class ForumApi {
    getLastTopic() {
        return axios.get(Vue.prototype.$hostName+"/last/topics")
    }

    getForums() {
        return axios.get(Vue.prototype.$hostName+"/forum")
    }

    getForum(id) {
        return axios.get(Vue.prototype.$hostName+"/forum/"+id)
    }
}
export default new ForumApi();