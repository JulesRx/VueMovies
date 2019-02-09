import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js';

import '../static/css/styles.scss';

import MovieItemComponent from './components/movie-item.vue';

const axios = require('axios');
Vue.prototype.$http = axios;

Vue.component('movie-item', MovieItemComponent);

Vue.use(Vuex);
var store = new Vuex.Store({
  state: {
    movies: []
  },
  mutations: {
    movies(state, movies) {
      state.movies = movies;
    },
    movie(state, movie) {
      state.movie = movie;
    },
  },
  actions: {
    getMovies(context) {
      axios.get('/api/movies').then((res) => {
        context.commit('movies', res.data);
      })
    },
    getMovie(context, id) {
      axios.get('/api/movies/' + id).then((res) => {
        context.commit('movie', res.data);
      })
    },
  }
});

const app = new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App),
  mounted() {
    this.$store.dispatch('getMovies');

    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('getMovie', this.$route.params.id);
    }
  }
});
