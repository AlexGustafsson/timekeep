<template>
  <div class="page">
    <h1>Settings</h1>
    <button @click="nuke">Nuke store</button>
  </div>
</template>

<script setup lang="ts">
async function nuke() {
  // await store.nuke();
  // window.location.replace("/");
}
</script>
