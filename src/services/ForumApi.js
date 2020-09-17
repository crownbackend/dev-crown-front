import axios from "axios";
import Vue from "vue";

class ForumApi {
    getLastTopic() {
        return axios.get(Vue.prototype.$hostName+"/last/topics")
    }

    getForums() {
        return axios.get(Vue.prototype.$hostName+"/forum")
    }

    getForum(id, slug) {
        return axios.get(Vue.prototype.$hostName+"/forum/"+id+"/"+slug)
    }

    getLoadMoreTopics(date, id) {
        return axios.get(Vue.prototype.$hostName+"/topics/show/more/"+date+"/"+id)
    }

    getTopic(id, slug) {
        return axios.get(Vue.prototype.$hostName+"/topic/"+id+"/"+slug)
    }

    getForumList() {
        return axios.get(Vue.prototype.$hostName+"/forums/category/list")
    }

    addTopic(title, forum, description) {
        let formData = new FormData();
        formData.append("title", title)
        formData.append("forum", forum)
        formData.append("description", description)
        return axios.post(Vue.prototype.$hostName+"/topic/new", formData)
    }

    sendImages(images) {
        return axios.post(Vue.prototype.$hostName+"/images/upload", images,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    getImagesUser(user) {
        return axios.get(Vue.prototype.$hostName+"/images/"+user)
    }

    deleteImage(image, userId) {
        return axios.delete(Vue.prototype.$hostName+"/image/"+image+"/"+userId)
    }
}
export default new ForumApi();