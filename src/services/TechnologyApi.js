import Vue from "vue";
import axios from "axios";

class TechnologyApi {

    getTechnologies() {
        return axios.get(Vue.prototype.$hostName+"/technologies");
    }

    getTechnology(id, slug) {
        return axios.get(Vue.prototype.$hostName+"/technology/"+slug+"/"+id);
    }

    getLastVideosTechnology(date, id)
    {
        this.date = date
        let formData = new FormData();
        formData.append("date", this.date)
        return axios.post(Vue.prototype.$hostName+"/technology/videos/load/more/"+id, formData)
    }

    getLastTechnologies(id)
    {
        return axios.get(Vue.prototype.$hostName+"/technologies/load/more/"+id)
    }
}

export default new TechnologyApi();