import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';

import MovieDetails from './views/movie/MovieDetails.vue';
import MovieEdit from './views/movie/MovieEdit.vue';

Vue.use(VueRouter);

export default new VueRouter({
  // mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  routes: [
    { path: '/movie/:id', component: MovieDetails, name: 'movie-details' },
    { path: '/movie/:id/edit', component: MovieEdit, name: 'movie-edit' },
    { path: '/about', component: About, name: 'about' },
    { path: '/', component: Home, name: 'home' },
  ]
});
