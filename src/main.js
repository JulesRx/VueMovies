import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios';

import './static/css/styles.scss';
import store from './store'

Vue.config.productionTip = false

// api key for imdb
const iaxios = new axios.create({
  params: { 'apikey': '8633b3c4' }
})
Vue.prototype.$ihttp = iaxios;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
