import { createRouter, createWebHistory } from "vue-router";
import type { RouterScrollBehavior, RouteRecordRaw } from "vue-router";

import HomePage from "./pages/home.vue";

export const routes: RouteRecordRaw[] = [{ path: "/", name: "home", component: HomePage }];

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (to.hash) return { el: to.hash };

  if (savedPosition) return savedPosition;

  return { left: 0, top: 0 };
};

const router = createRouter({
  routes,
  history: createWebHistory(),
  // linkExactActiveClass: "exact-active",
  // linkActiveClass: "active",
  scrollBehavior,
});

export default router;
