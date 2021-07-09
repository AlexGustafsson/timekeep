<template>
  <div class="flex flex-col items-center justify-content-center p-5 mh-3">
    <slot></slot>
    <p class="my-2">{{ primary }}</p>
    <p class="my-2 text-gray-50">{{ secondary }}</p>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

class Props {
  primary!: string;
  secondary!: string;
}

class TimekeepShowcaseItem extends Vue.with(Props) {}
export {TimekeepShowcaseItem as default};
</script>
