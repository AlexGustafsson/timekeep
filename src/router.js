import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  HomePage,
} from './pages';

Vue.use(VueRouter);

export const routes = [
  {path: '/', name: 'home', component: HomePage}
];

export default new VueRouter({
  routes,
  mode: 'history',
  saveScrollPosition: true,
  linkExactActiveClass: 'exact-active',
  linkActiveClass: 'active',
  scrollBehavior() {
    return {x: 0, y: 0};
  }
});
