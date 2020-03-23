import axios from "axios";
import Vue from "vue";

class ForumApi {
    getLastTopic() {
        return axios.get(Vue.prototype.$hostName+"/last/topics")
    }
}
export default new ForumApi();