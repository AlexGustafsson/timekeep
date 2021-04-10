<template>
  <div class="app">
    <timekeep-menu />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script lang="ts">
import TimekeepMenu from "./components/timekeep-menu.vue";

export default {
  components: { TimekeepMenu },
};
</script>

<style scoped>
.app {
  padding-left: 48px;
}
</style>
