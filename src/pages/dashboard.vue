<template>
  <div class="page page-dashboard">
    <header class="split">
      <ion-dashboard />
      <h1>Dashboard</h1>
      <router-link :to="{ name: 'create' }"><timekeep-fab tooltip="Add Project" /></router-link>
    </header>

    <!-- Filter -->
    <timekeep-showcase>
      <timekeep-showcase-item primary="Favorites" secondary="4">
        <timekeep-icon>
          <ion-favorite />
        </timekeep-icon>
      </timekeep-showcase-item>

      <timekeep-showcase-item primary="Popular" secondary="5">
        <timekeep-icon>
          <ion-trending />
        </timekeep-icon>
      </timekeep-showcase-item>

      <timekeep-showcase-item primary="Recent" secondary="10">
        <timekeep-icon>
          <ion-repeat />
        </timekeep-icon>
      </timekeep-showcase-item>
    </timekeep-showcase>

    <!-- Search -->
    <timekeep-input placeholder="Filter by project, group and tags">
      <template v-slot:icon>
        <ion-search />
      </template>
    </timekeep-input>

    <main>
      <timekeep-time-card
        v-for="timekeep in timekeeps"
        @click="timekeep.active = !timekeep.active"
        :key="timekeep.id"
        :active="timekeep.active"
        :group="timekeep.group"
        :name="timekeep.name"
        :timeToday="timekeep.timeToday"
        :timeThisWeek="timekeep.timeThisWeek"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

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

const components = {
  IonDashboard,
  IonFavorite,
  IonRepeat,
  IonTrending,
  IonSearch,
  TimekeepFab,
  TimekeepIcon,
  TimekeepShowcase,
  TimekeepShowcaseItem,
  TimekeepTimeCard,
  TimekeepInput,
};

interface ProjectView {
  id: string;
  group: string;
  name: string;
  timeToday: number;
  timeThisWeek: number;
  active: boolean;
}

@Options({ components })
export default class extends Vue {
  timekeeps: ProjectView[] = [];

  async mounted() {
    const projects = await this.$store.getAllProjects();
    this.timekeeps = projects.map((project) => ({
      id: project._id,
      name: project.data.name,
      group: project.data.group,
      timeToday: 0,
      timeThisWeek: 0,
      active: false,
    })) as ProjectView[];
  }
}
</script>

<style scoped>
@import "../style/page.css";

.page > main {
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-content: space-between;
  justify-content: space-between;
}

.page .timekeep-time-card {
  cursor: pointer;
}
</style>
