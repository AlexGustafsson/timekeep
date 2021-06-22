<template>
  <div class="pl-12">
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
