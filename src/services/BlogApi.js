import axios from "axios";
import Vue from "vue";

class BlogApi {
    getArticles() {
        return axios.get(Vue.prototype.$hostName+"/articles")
    }

    getLastArticlesHome() {
        return axios.get(Vue.prototype.$hostName+"/articles/home")
    }

    getLastArticles(date) {
        return axios.get(Vue.prototype.$hostName+"/last/articles/"+date)
    }

    getArticle(slug, id) {
        this.slug = slug
        this.id = id
        return axios.get(Vue.prototype.$hostName+"/article/"+slug+"/"+id)
    }
}

export default new BlogApi();