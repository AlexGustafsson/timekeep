<template>
  <div class="page page-history">
    <header>
      <ion-calendar />
      <h1>History</h1>
      <h2>- {{ year }}</h2>
      <router-link :to="{ name: 'create' }"><timekeep-fab tooltip="Add Project" /></router-link>
    </header>
    <timekeep-showcase>
      <timekeep-showcase-item primary="16h 12m 32s" secondary="Total Time" />
      <timekeep-showcase-item primary="January" secondary="Top Month" />
      <timekeep-showcase-item primary="Monday" secondary="Top Weekday" />
      <timekeep-showcase-item primary="41" secondary="Top Week" />
    </timekeep-showcase>
    <main v-if="parsedYear >= 1970">
      <timekeep-calendar v-for="(_, i) in 12" :key="i" :year="parsedYear" :month="i + 1" />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

import TimekeepCalendar from "@/components/timekeep-calendar.vue";
import TimekeepShowcase from "@/components/timekeep-showcase.vue";
import TimekeepShowcaseItem from "@/components/timekeep-showcase-item.vue";
import TimekeepFab from "@/components/timekeep-fab.vue";
import IonCalendar from "@/components/ion-icons/calendar.vue";
const components = {
  TimekeepCalendar,
  TimekeepShowcase,
  TimekeepShowcaseItem,
  TimekeepFab,
  IonCalendar,
};

class Props {
  year!: string;
}

@Options({ components })
export default class extends Vue.with(Props) {
  parsedYear = 0;

  mounted(): void {
    this.parsedYear = Number.parseInt(this.year);
  }
}
</script>

<style>
@import "../style/page.css";

.page-history > main {
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-around;
  align-content: space-between;
  justify-content: space-between;
  row-gap: 10px;
}

.page-history > header > h2 {
  flex-grow: 1;
}
</style>
