import axios from "axios";
import Vue from "vue";

class SearchApi {
    search(search) {

        return axios.get(Vue.prototype.$hostName+"/search/"+search)
    }
}

export default new SearchApi()