import Vue from 'vue';

// Import global style (contains reset-css which needs to be loaded first)
import './style/main.css';

import {App} from './components';

import store from './store';
import router from './router';

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
