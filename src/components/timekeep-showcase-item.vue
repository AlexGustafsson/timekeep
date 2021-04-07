<template>
  <div class="timekeep-showcase-item">
    <slot></slot>
    <p class="primary">{{ primary }}</p>
    <p class="secondary">{{ secondary }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    primary: String,
    secondary: String,
  },
};
</script>

<style scoped>
.timekeep-showcase-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin: 0 10px;
}

.timekeep-showcase-item p {
  margin: 5px 0;
}

.timekeep-showcase-item p.secondary {
  color: #808080;
}
</style>
