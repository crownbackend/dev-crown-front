import axios from "axios";
import Vue from "vue";

class UserApi {
    verifyUsername(username) {
        this.username = username;
        return axios.get(Vue.prototype.$hostName+"/verify/username/"+username)
    }

    verifyEmail(email) {
        this.email = email;
        return axios.get(Vue.prototype.$hostName+"/verify/email/"+email)
    }

    register(email, username, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        const formData = new FormData();
        formData.append('username', this.username)
        formData.append('email', this.email)
        formData.append('password', this.password)
        return axios.post(Vue.prototype.$hostName+"/register", formData)
    }

    confirmationAccount(token) {
        this.token = token;
        return axios.get(Vue.prototype.$hostName+"/register/confirm/account/"+token)
    }

    verifyToken() {
        //this.token = token
        return axios.get(Vue.prototype.$hostName+"/check/login/verify/token")
    }
}

export default new UserApi();