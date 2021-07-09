<template>
  <div class="w-12 h-12 flex flex-cols items-center justify-center relative">
    <slot></slot>
    <timekeep-icon-circles class="absolute top-1/2 left-1/2 w-12 h-12 transform -translate-x-1/2 -translate-y-1/2" :class="{ active }" />
  </div>
</template>

<script setup lang="ts">
import TimekeepIconCircles from "./circles.vue";

interface Props {
  active: boolean
}

withDefaults(defineProps<Props>(), {active: false});
</script>

<style>
/* .timekeep-icon.negative {
  color: #e28884;
}

.timekeep-icon.primary {
  color: #64b7dd;
}

.timekeep-icon.inactive {
  color: #95b8c0;
}

.timekeep-icon.clickable {
  cursor: pointer;
} */
</style>
