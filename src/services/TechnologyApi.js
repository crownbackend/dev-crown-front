import Vue from "vue";
import axios from "axios";

class TechnologyApi {

    getTechnologies() {
        return axios.get(Vue.prototype.$hostName+"/technologies");
    }
}

export default new TechnologyApi();