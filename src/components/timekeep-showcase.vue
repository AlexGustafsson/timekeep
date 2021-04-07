<template>
  <div class="timekeep-showcase">
    <slot></slot>
  </div>
</template>

<style scoped>
.timekeep-showcase {
  display: flex;
  padding: 15px;
  background-color: white;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 15px 0;
}
</style>
