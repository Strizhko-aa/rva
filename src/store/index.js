import { createStore } from 'vuex'

const store = createStore({
  state: () => ({
    user: {},
    isAuthorized: false
  }),
  mutations: {
    setValue (state, keyVal) {
      state[keyVal.key] = keyVal.value
    }
  },
  actions: {
    SET_VALUE({ commit }, keyVal) {
      commit('setValue', keyVal)
    }
  }
})

export default store
