import axios from "axios";
import Vue from "vue";

class CommentApi {

    getComments(video) {
        this.video = video
        return axios.get(Vue.prototype.$hostName+"/comments/"+video)
    }

    newComment(content, video) {
        this.content = content
        this.video = video
        const formData = new FormData();
        formData.append('content', this.content)
        formData.append("token", localStorage.getItem("token"))
        formData.append("video", video)
        return axios.post(Vue.prototype.$hostName+"/comments", formData)
    }

    editComment(id, content) {
        this.id = id
        this.content = content
        const formData = new FormData();
        formData.append('content', this.content)
        formData.append("token", localStorage.getItem("token"))
        formData.append("id", this.id)
        formData.append('_method', 'PUT')
        return axios.post(Vue.prototype.$hostName+"/comments/"+id, formData)
    }

    deleteComment(id) {
        return axios.delete(Vue.prototype.$hostName+"/delete/"+id, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
    }
}

export default new CommentApi();