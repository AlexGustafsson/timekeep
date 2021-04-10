<template>
  <div class="timekeep-icon">
    <slot></slot>
    <timekeep-icon-circles class="circles" :class="{ active }" />
  </div>
</template>

<script lang="ts">
import TimekeepIconCircles from "./circles.vue";

import { Vue, Options, prop } from "vue-class-component";

const components = {
  TimekeepIconCircles,
};

class Props {
  active = prop<boolean>({ default: false });
}

@Options({ components })
export default class TimekeepIcon extends Vue.with(Props) {}
</script>

<style>
.timekeep-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #398f47;
  transition: 0.2s color ease-in-out;
}

.timekeep-icon.negative {
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
}

.timekeep-icon .circles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.timekeep-icon .ion-icon {
  pointer-events: none;
}
</style>
