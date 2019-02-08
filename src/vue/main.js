import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js';

import MovieItemComponent from './components/movie-item.vue';

const axios = require('axios');
Vue.prototype.$http = axios;

Vue.component('movie-item', MovieItemComponent);

Vue.use(Vuex);
var store = new Vuex.Store({

});

const app = new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App),
  mounted() {
    console.log('Mounted !');
  }
});
