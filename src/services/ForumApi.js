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

    addTopic(title, forum, description, userId) {
        let formData = new FormData();
        formData.append("title", title)
        formData.append("forum", forum)
        formData.append("description", description)
        formData.append("userId", userId)
        return axios.post(Vue.prototype.$hostName+"/topic/new", formData)
    }

    editTopic(title, forum, description, userId, close, resolve, id) {
        let formData = new FormData();
        formData.append("title", title)
        formData.append("forum", forum)
        formData.append("description", description)
        formData.append("userId", userId)
        formData.append("close", close)
        formData.append("resolve", resolve)
        formData.append('_method', 'PUT');
        return axios.post(Vue.prototype.$hostName+"/topic/edit/"+id, formData)
    }

    deleteTopic(id) {
        return axios.delete(Vue.prototype.$hostName+"/topic/delete/"+id)
    }

    getTopicEdit(id, slug) {
        return axios.get(Vue.prototype.$hostName+"/topic/edit"+id+"/"+slug)
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

    addResponse(description, userId, topicId) {
        let formData = new FormData();
        formData.append("topicId", topicId)
        formData.append("description", description)
        formData.append("userId", userId)
        return axios.post(Vue.prototype.$hostName+"/responses", formData)
    }
}
export default new ForumApi();