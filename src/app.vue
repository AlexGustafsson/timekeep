<template>
  <div class="pl-12">
    <timekeep-menu />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script setup lang="ts">
import TimekeepMenu from "./components/timekeep-menu.vue";
</script>
