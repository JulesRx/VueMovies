import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/vue/components/home.vue'
import About from '@/vue/components/about.vue'
import MovieAdd from '@/vue/components/movie/movie-add.vue'
import MovieEdit from '@/vue/components/movie/movie-edit.vue'

Vue.use(Router)

export default new Router({
  // history mode do not work with gh-pages without a custom domain: https://bit.ly/2WJawOQ
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/movie/add', name: 'MovieCreate', component: MovieAdd },
    { path: '/movie/:id/edit', name: 'MovieEdit', component: MovieEdit },
    { path: '/about', name: 'About', component: About },
  ]
})
