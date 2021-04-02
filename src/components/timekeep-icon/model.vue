<template>
  <div class="timekeep-icon">
    <slot></slot>
    <circles :active="active" class="circles" />
  </div>
</template>

<script lang="ts">
import StopwatchIcon from '../icons/stopwatch.vue';
import Circles from './circles.vue';

export default {
  components: { StopwatchIcon, Circles },
  name: 'TimekeepIcon',
  props: {
    active: Boolean,
  }
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
    color: #398F47;
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
