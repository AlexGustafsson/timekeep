<template>
  <div class="page page-dashboard">
    <header>
      <ion-dashboard />
      <h1>Dashboard</h1>
      <timekeep-fab />
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
      <timekeep-time-card v-for="timekeep in timekeeps" @click="timekeep.active = !timekeep.active" :key="timekeep.id" :active="timekeep.active" :group="timekeep.group" :name="timekeep.name" :timeToday="timekeep.timeToday" :timeThisWeek="timekeep.timeThisWeek" />
    </main>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue";

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

  export default defineComponent({
    data() {
      return {
        timekeeps: [
          {id: 0, group: "Timekeep", name: "Frontend Development", timeToday: 4561, timeThisWeek: 3456789, active: false},
          {id: 1, group: "Timekeep", name: "Backend Development", timeToday: 4561, timeThisWeek: 3456789, active: false},
          {id: 2, group: "Timekeep", name: "Design", timeToday: 4561, timeThisWeek: 3456789, active: false},
          {id: 3, group: "Timekeep", name: "Documentation", timeToday: 4561, timeThisWeek: 3456789, active: false},
        ]
      }
    },
    async mounted() {
      const projects = await this.$store.getAllProjects();
      console.log(projects);
    },
    components: {
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
      TimekeepInput
    }
  });
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

  .page .timekeep-input {
    margin-bottom: 25px;
  }
</style>
