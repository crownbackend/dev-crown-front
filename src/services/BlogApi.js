import axios from "axios";
import Vue from "vue";

class BlogApi {
    getArticles() {
        return axios.get(Vue.prototype.$hostName+"/articles")
    }

    getLastArticles() {
        return axios.get(Vue.prototype.$hostName+"/last/articles")
    }
}

export default new BlogApi();