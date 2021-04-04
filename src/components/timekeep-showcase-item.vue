<template>
  <article>
    <slot></slot>
    <p class="primary">{{primary}}</p>
    <p class="secondary">{{secondary}}</p>
  </article>
</template>

<script lang="ts">
export default {
  props: {
    primary: String,
    secondary: String
  }
};
</script>

<style scoped>
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    margin: 0 10px;
  }

  p {
    margin: 5px 0;
  }

  p.secondary {
    color: #808080;
  }
</style>
