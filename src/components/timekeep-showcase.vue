<template>
  <main>
    <slot></slot>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    padding: 15px;
    background-color: white;
    border-radius: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
