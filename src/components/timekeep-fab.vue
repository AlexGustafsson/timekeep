<template>
  <div class="timekeep-fab">
    <ion-add />
  </div>
</template>

<script lang="ts">
import IonAdd from "./ion-icons/add.vue";

import { Vue, Options } from "vue-class-component";

const components = { IonAdd };

@Options({ components })
class TimekeepFab extends Vue {}
export {TimekeepFab as default};
</script>

<style scoped>
.timekeep-fab {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  transition: 0.1s box-shadow;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.timekeep-fab .ion-icon {
  pointer-events: none;
}

.timekeep-fab:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.timekeep-fab:active {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
