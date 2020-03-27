import axios from "axios";
import Vue from "vue";

class BlogApi {
    getArticles() {
        return axios.get(Vue.prototype.$hostName+"/articles")
    }

    getLastArticles() {
        return axios.get(Vue.prototype.$hostName+"/last/articles")
    }

    getArticle(slug, id) {
        this.slug = slug
        this.id = id
        return axios.get(Vue.prototype.$hostName+"/article/"+slug+"/"+id)
    }
}

export default new BlogApi();