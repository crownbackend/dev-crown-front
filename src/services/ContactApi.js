import axios from "axios";
import Vue from "vue";

class ContactApi {
    sendEmail(email, name, message) {
        let formData = new FormData()
        formData.append("email", email)
        formData.append("name", name)
        formData.append("message", message)
        return axios.post(Vue.prototype.$hostName+"/contact", formData);
    }
}

export default new ContactApi();