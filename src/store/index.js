import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    saveUsername (state, username) {
      state.username = username
    }
  },
  actions: {

  },
  getters: {

  }
})

export default store
