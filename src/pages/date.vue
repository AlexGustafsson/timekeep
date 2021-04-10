<template>
  <div class="page page-date">
    <header class="split">
      <ion-calendar />
      <h1>Dashboard</h1>
      <router-link :to="{ name: 'create' }"><timekeep-fab tooltip="Add Project" /></router-link>
    </header>
    <main>
      <timekeep-calendar v-for="(_, i) in 12" :key="i" :year="2021" :month="i" />
    </main>
  </div>
</template>

<script lang="ts">
import {Vue, Options} from "vue-class-component";

import TimekeepCalendar from "@/components/timekeep-calendar.vue";
import IonCalendar from "@/components/ion-icons/calendar.vue";
const components = {
  TimekeepCalendar,
  IonCalendar,
};

@Options({components})
export default class extends Vue {

}
</script>

<style>
@import "../style/page.css";

.page-date > main {
  display: flex;
  flex-wrap: wrap;
}
</style>
