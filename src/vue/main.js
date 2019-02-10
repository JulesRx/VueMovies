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
    movies: [],
    movie: null
  },
  mutations: {
    updateMovies(state, movies) {
      state.movies = movies;
    },
    updateMovieSelected(state, movie) {
      state.movie = movie;
    },
    deleteMovie(state, id) {
      var index = state.movies.findIndex(m => m.id == id);
      if (index != -1) {
        state.movies.splice(index, 1);
      }
    }
  },
  actions: {
    getMoviesAPI(context) {
      axios.get('/api/movies').then((res) => {
        context.commit('updateMovies', res.data);
      })
    },
    getMovieAPI(context, id) {
      axios.get('/api/movie/' + id).then((res) => {
        context.commit('updateMovieSelected', res.data);
      })
    },
    deleteMovieAPI(context, id) {
      return new Promise((resolve, reject) => {
        axios.delete('/api/movie/' + id + '/delete')
          .then(res => {
            if (res.status == 204) {
              context.commit('deleteMovie', id);
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          })
      })
    }
  }
});

const app = new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App),
  mounted() {
    this.$store.dispatch('getMoviesAPI');

    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('getMovieAPI', this.$route.params.id);
    }
  }
});
