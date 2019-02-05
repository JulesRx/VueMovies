import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios';

import './static/css/styles.scss';

Vue.config.productionTip = false

axios.defaults.params = {};
axios.defaults.params['apikey'] = '8633b3c4';
Vue.prototype.$http = axios;

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
