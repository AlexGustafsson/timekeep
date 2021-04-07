import { createRouter, createWebHistory } from "vue-router";
import type { RouterScrollBehavior, RouteRecordRaw } from "vue-router";

import DashboardPage from "./pages/dashboard.vue";
import FavoritesPage from "./pages/favorites.vue";
import DatePage from "./pages/date.vue";
import InsightsPage from "./pages/insights.vue";
import TagsPage from "./pages/tags.vue";
import ExportPage from "./pages/export.vue";
import SettingsPage from "./pages/settings.vue";
import EditPage from "./pages/edit.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "dashboard", component: DashboardPage },
  { path: "/favorites", name: "favorites", component: FavoritesPage },
  { path: "/date", name: "date", component: DatePage },
  { path: "/insights", name: "insights", component: InsightsPage },
  { path: "/tags", name: "tags", component: TagsPage },
  { path: "/export", name: "export", component: ExportPage },
  { path: "/settings", name: "settings", component: SettingsPage },
  { path: "/edit/:projectId", name: "edit", component: EditPage, props: true },
];

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
