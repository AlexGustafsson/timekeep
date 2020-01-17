import CompositionApi from '@vue/composition-api';
import Vue from 'vue';

// Import global style (contains reset-css which needs to be loaded first)
import './style/main.css';

import {App} from './components';

import {Store} from './state';
import router from './router';

Vue.use(CompositionApi);
Vue.use(Store);

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
