import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ci: {
      id: 20,
      nm: '广州',
      py: 'guangzhou'
    },
    location: {
      lng: 0,
      lat: 0,
    },
    Logining: false,
    Ticks: []
  },
  getters: {},
  mutations: {
    updataCity(state, payload) {
      state.ci = payload;
    },
    lnglat(state, payload) {
      state.location = payload
    },
    Logining(state, payload) {
      state.Logining = payload
    },
    Ticks(state, payload) {
      state.Ticks.push(payload)
    }
  },
  actions: {},
  modules: {}
})