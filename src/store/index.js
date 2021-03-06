import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user, userId, email) {
      state.status = 'success'
      state.token = token
      state.user = user
      state.userId = userId
      state.email = email
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.user = ''
      state.userId = ''
      state.email = ''
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post(Vue.prototype.$hostName+"/login_check", {
          "Content-Type:": "application/json",
          username: user.username,
          password: user.password
        })
            .then(resp => {
              const token = resp.data.token
              const user = resp.data.user
              const userId = resp.data.userId
              const email = resp.data.email
              localStorage.setItem('token', token)
              localStorage.setItem('user', user)
              localStorage.setItem('userId', userId)
              localStorage.setItem('email', email)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, user)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              localStorage.removeItem('userId')
              localStorage.removeItem('email')
              reject(err)
            })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})