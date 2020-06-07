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
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")
        return axios.get(Vue.prototype.$hostName+"/check/login/verify/token")
    }

    sendNewPassword(email) {
        this.email = email
        const formData = new FormData();
        formData.append("email", email)
        return axios.post(Vue.prototype.$hostName+"/forgot/password", formData)
    }

    changePassword(token, password) {
        this.token = token
        this.password = password
        const formData = new FormData();
        formData.append("password", password)
        return axios.post(Vue.prototype.$hostName+"/forgot/password/"+token, formData)
    }

    verifyProfile(username) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")
        return axios.get(Vue.prototype.$hostName+"/profile/"+username);
    }

    editProfile(username, email, password, file) {
        let formData = new FormData()
        formData.append("email", email)
        formData.append("username", username)
        formData.append("password", password)
        formData.append("avatar", file)
        formData.append("_method", "PUT")
        return axios.post(Vue.prototype.$hostName+"/profile/edit/", formData);
    }
}

export default new UserApi();