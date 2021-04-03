<template>
  <div class="timekeep-icon">
    <slot></slot>
    <timekeep-icon-circles :active="active" class="circles" />
  </div>
</template>

<script lang="ts">
import IonStopwatch from "../ion-icons/stopwatch.vue";
import TimekeepIconCircles from "./circles.vue";

export default {
  components: { IonStopwatch, TimekeepIconCircles },
  name: "timekeep-icon",
  props: {
    active: Boolean,
  },
};
</script>

<style scoped>
.timekeep-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #398f47;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
