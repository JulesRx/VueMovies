import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js';

import '../static/css/styles.scss';

import MovieItemComponent from './components/movie-item.vue';
import MovieFormComponent from './components/movie-form.vue';

const axios = require('axios');
Vue.prototype.$http = axios;

Vue.component('movie-item', MovieItemComponent);
Vue.component('movie-form', MovieFormComponent);

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
    addMovie(state, movie) {
      state.movies.push(movie);
    },
    updateMovie(state, movie) {
      var index = state.movies.findIndex(m => m.id == movie.id);
      if (index != -1) {
        state.movies[index] = movie;
      }
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
      });
    },
    getMovieAPI(context, id) {
      axios.get('/api/movie/' + id).then((res) => {
        context.commit('updateMovieSelected', res.data);
      });
    },
    addMovieAPI(context, params) {
      return new Promise((resolve, reject) => {
        var formData = new FormData();
        formData.append('movie', JSON.stringify(params.movie));
        formData.append('poster', params.poster);

        axios.post('/api/movies', formData)
          .then(response => {
            if (response.status === 200) {
              context.commit('addMovie', response.data);
              resolve(response.data.id);
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          })
      })
    },
    updateMovieAPI(context, params) {
      return new Promise((resolve, reject) => {
        var data = new FormData();
        data.append('movie', JSON.stringify(params.movie));
        data.append('poster', params.poster);

        axios.put('/api/movie/' + params.movie.id, data)
          .then(res => {
            if (res.status == 200) {
              context.commit('updateMovie', res.data);
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
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
          });
      });
    },
  }
});

const app = new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App),
  mounted() {
    this.$store.dispatch('getMoviesAPI');

    if (this.$route.params.id != undefined) {
      this.$store.dispatch('getMovieAPI', this.$route.params.id);
    }
  }
});
