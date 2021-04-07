<template>
  <div class="page page-edit">
    <header>
      <ion-stopwatch />
      <h1>Dashboard</h1>
      <h2>- {{ name }}</h2>
    </header>

    <header class="right">
      <timekeep-icon class="clickable"><ion-stopwatch /></timekeep-icon>
      <timekeep-icon class="clickable negative"><ion-delete /></timekeep-icon>
    </header>

    <timekeep-showcase>
      <timekeep-showcase-item primary="42m 32s" secondary="Today" />
      <timekeep-showcase-item primary="12h 41m" secondary="This Week" />
      <timekeep-showcase-item primary="1d 11h 51m" secondary="Total" />
    </timekeep-showcase>

    <!-- Project name -->
    <timekeep-input v-model="name">
      <template v-slot:icon>
        <p>Name</p>
      </template>
    </timekeep-input>

    <!-- Project group -->
    <timekeep-input v-model="group">
      <template v-slot:icon>
        <p>Group</p>
      </template>
    </timekeep-input>

    <!-- Project tags -->
    <timekeep-input placeholder="Add a tag">
      <template v-slot:icon>
        <ion-tag />
      </template>
    </timekeep-input>

    <!-- Notes -->
    <timekeep-notebook v-model:notes="notes" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import IonStopwatch from "../components/ion-icons/stopwatch.vue";
import IonDelete from "../components/ion-icons/delete.vue";
import IonTag from "../components/ion-icons/tag.vue";
import TimekeepIcon from "../components/timekeep-icon/model.vue";
import TimekeepShowcase from "../components/timekeep-showcase.vue";
import TimekeepShowcaseItem from "../components/timekeep-showcase-item.vue";
import TimekeepInput from "@/components/timekeep-input.vue";
import TimekeepNotebook from "@/components/timekeep-notebook.vue";

export default defineComponent({
  mounted() {
    console.log(this.projectId);
  },
  data() {
    return {
      notes: [],
      name: "Frontend Development",
      group: "Timekeep",
      tags: [],
    };
  },
  props: {
    projectId: {
      type: String,
      required: true,
    },
  },
  components: {
    IonStopwatch,
    IonDelete,
    IonTag,
    TimekeepIcon,
    TimekeepShowcase,
    TimekeepShowcaseItem,
    TimekeepInput,
    TimekeepNotebook,
  },
});
</script>

<style scoped>
@import "../style/page.css";

.page-edit > header .timekeep-icon {
  margin: 0 10px;
}
</style>
