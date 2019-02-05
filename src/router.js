import Vue from 'vue'
import Router from 'vue-router'

import Movies from '@/vue/components/movies.vue'
// import MovieDetail from '@/views/movie/MovieDetail.vue'
// import MovieEdit from '@/views/movie/MovieEdit.vue'
import About from '@/vue/components/about.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Movies', component: Movies },
    // { path: '/movie/:id', name: 'movie-detail', component: MovieDetail },
    // { path: '/movie/:id/edit', name: 'movie-edit', component: MovieEdit },
    { path: '/about', name: 'About', component: About },
  ]
})
