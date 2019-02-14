import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js';

import MovieItemComponent from './components/movie-item.vue';
import MovieFormComponent from './components/movie-form.vue';

import '../static/css/styles.scss';

import rate from 'vue-rate';
Vue.use(rate)

import axios from 'axios';
Vue.prototype.$http = axios;

Vue.component('movie-item', MovieItemComponent);
Vue.component('movie-form', MovieFormComponent);

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    movies: [],
    movie: null
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies;
    },
    GET_MOVIE_SELECTED(state, movie) {
      state.movie = movie;
    },
    ADD_MOVIE(state, movie) {
      state.movies.push(movie);
    },
    UPDATE_MOVIE(state, movie) {
      var index = state.movies.findIndex(m => m.id == movie.id);
      if (index != -1) {
        state.movies[index] = movie;
      }
    },
    RATE_MOVIE(state, params) {
      var index = state.movies.findIndex(m => m.id == params.id);
      if (index == -1) {
        state.movies[index].ratings.push(params.rating);
      }
    },
    DELETE_MOVIE(state, id) {
      var index = state.movies.findIndex(m => m.id == id);
      if (index != -1) {
        state.movies.splice(index, 1);
      }
    }
  },
  actions: {
    getMoviesAPI(context) {
      axios.get('/api/movies').then((res) => {
        context.commit('GET_MOVIES', res.data);
      });
    },
    getMovieAPI(context, id) {
      axios.get('/api/movie/' + id).then((res) => {
        context.commit('GET_MOVIE_SELECTED', res.data);
      });
    },
    addMovieAPI(context, params) {
      return new Promise((resolve, reject) => {
        var formData = new FormData();
        formData.append('movie', JSON.stringify(params.movie));
        formData.append('poster', params.poster);

        axios.post('/api/movies', formData)
          .then(res => {
            if (res.status === 200) {
              context.commit('ADD_MOVIE', res.data);
              resolve(res.data.id);
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
              context.commit('UPDATE_MOVIE', res.data);
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
    rateMovieAPI(context, params) {
      return new Promise((resolve, reject) => {
        console.log(params);
        axios.post('/api/movie/' + params.id + '/rate', { rating: params.rating })
          .then(res => {
            if (res.status === 204) {
              context.commit('RATE_MOVIE', params);
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          })
      })
    },
    deleteMovieAPI(context, id) {
      return new Promise((resolve, reject) => {
        axios.delete('/api/movie/' + id + '/delete')
          .then(res => {
            if (res.status == 204) {
              context.commit('DELETE_MOVIE', id);
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
    posterOmdbAPI(context, title) {
      return new Promise((resolve, reject) => {
        axios.get('/api/omdb', { params: { title: title } })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            if (err.response) {
              resolve(err.response.data);
            }
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

    if (this.$route.params.id != undefined) {
      this.$store.dispatch('getMovieAPI', this.$route.params.id);
    }
  }
});
