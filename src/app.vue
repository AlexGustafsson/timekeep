<template>
  <div class="app">
    <timekeep-menu />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script lang="ts">
import TimekeepMenu from "./components/timekeep-menu.vue";

const App = {
  components: { TimekeepMenu },
};
export {App as default};
</script>

<style scoped>
.app {
  padding-left: 48px;
}
</style>
