import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';

Vue.use(VueRouter);

export default new VueRouter({
  // mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  routes: [
    { path: '/about', component: About, name: 'about' },
    { path: '/', component: Home, name: 'home' },
  ]
});
