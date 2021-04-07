<template>
  <div class="timekeep-icon">
    <slot></slot>
    <timekeep-icon-circles class="circles" :class="{active}" />
  </div>
</template>

<script lang="ts">
import TimekeepIconCircles from "./circles.vue";

export default {
  components: { TimekeepIconCircles },
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

.timekeep-icon.negative {
  color: #e28884;
}

.timekeep-icon.primary {
  color: #64B7DD;
}

.timekeep-icon.inactive {
  color: #95B8C0;
}

.timekeep-icon.clickable {
  cursor: pointer;
}

.timekeep-icon .circles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
}
</style>
