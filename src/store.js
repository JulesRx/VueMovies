import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'app',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: []
  },
  mutations: {
    addMovie(state, movie) {
      state.movies.push(movie);
    }
  },
  actions: {

  },
  plugins: [vuexPersist.plugin]
})
