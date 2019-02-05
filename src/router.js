import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/vue/components/home.vue'
import About from '@/vue/components/about.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
  ]
})
