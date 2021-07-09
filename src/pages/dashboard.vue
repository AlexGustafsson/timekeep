<template>
  <div class="page">
    <header class="page-header">
      <ion-dashboard />
      <h1 class="page-title">Dashboard</h1>
      <router-link :to="{ name: 'create' }"><timekeep-fab tooltip="Add Project" /></router-link>
    </header>

    <!-- Filter -->
    <timekeep-showcase class="my-3">
      <timekeep-showcase-item primary="Favorites" secondary="4">
        <timekeep-icon
          :class="{ positive: filter.favorites, negative: !filter.favorites }"
          @click="filter.favorites = !filter.favorites"
          tooltip="Toggle Favorites"
          tooltip-above
        >
          <ion-favorite />
        </timekeep-icon>
      </timekeep-showcase-item>

      <timekeep-showcase-item primary="Popular" secondary="5">
        <timekeep-icon
          :class="{ positive: filter.popular, negative: !filter.popular }"
          @click="filter.popular = !filter.popular"
          tooltip="Toggle Popular"
          tooltip-above
        >
          <ion-trending />
        </timekeep-icon>
      </timekeep-showcase-item>

      <timekeep-showcase-item primary="Recent" secondary="10">
        <timekeep-icon
          :class="{ positive: filter.recent, negative: !filter.recent }"
          @click="filter.recent = !filter.recent"
          tooltip="Toggle Recent"
          tooltip-above
        >
          <ion-repeat />
        </timekeep-icon>
      </timekeep-showcase-item>
    </timekeep-showcase>

    <!-- Search -->
    <timekeep-input class="my-3" placeholder="Filter by project, group and tags">
      <template v-slot:icon>
        <ion-search />
      </template>
    </timekeep-input>

    <main>
      <timekeep-time-card
        v-for="timekeep in timekeeps"
        :key="timekeep.id"
        :active="timekeep.active"
        :group="timekeep.group"
        :name="timekeep.name"
        :timeToday="timekeep.timeToday"
        :timeThisWeek="timekeep.timeThisWeek"
        :color="timekeep.color"
        @toggled="timekeep.active = !timekeep.active"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

import IonDashboard from "../components/ion-icons/dashboard.vue";
import IonFavorite from "../components/ion-icons/favorite.vue";
import IonRepeat from "../components/ion-icons/repeat.vue";
import IonTrending from "../components/ion-icons/trending.vue";
import IonSearch from "../components/ion-icons/search.vue";
import TimekeepFab from "../components/timekeep-fab.vue";
import TimekeepIcon from "../components/timekeep-icon/model.vue";
import TimekeepShowcase from "../components/timekeep-showcase.vue";
import TimekeepShowcaseItem from "../components/timekeep-showcase-item.vue";
import TimekeepTimeCard from "../components/timekeep-time-card.vue";
import TimekeepInput from "../components/timekeep-input.vue";

import { colorHash } from "../utils/color";

interface ProjectView {
  id: string;
  group: string;
  name: string;
  timeToday: number;
  timeThisWeek: number;
  active: boolean;
  color: string;
}

const timekeeps = ref<ProjectView[]>([]);
const filter = ref({
  favorites: false,
  popular: false,
  recent: false
});

// TODO: Implement again
// const projects = await $store.getAllProjects();
// timekeeps.value = projects.map(project => ({
//   id: project._id,
//   name: project.data.name,
//   group: project.data.group,
//   timeToday: 0,
//   timeThisWeek: 0,
//   active: false,
//   color: colorHash(project.data.group ?? project.data.name),
// }));
</script>

<style scoped>
.page-dashboard > main {
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-content: space-between;
  justify-content: space-between;
  row-gap: 10px;
}

.page-dashboard > .timekeep-showcase .timekeep-icon {
  cursor: pointer;
}
</style>
