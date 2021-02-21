import Vue from 'vue'
import Vuex from 'vuex'
import ieat from './ieat/ieat.js'
import chat from './chat/chat.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ieat,
    chat
  }
})
