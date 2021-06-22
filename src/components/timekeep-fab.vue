<template>
  <div class="cursor-pointer transition-shadow bg-white w-12 h-12 rounded-full p-2 shadow-lg hover:shadow-xl select-none active:shadow-none">
    <ion-add class="pointer-events-none" />
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
