<template>
  <svg aria-hidden="true" role="img" width="32" height="32">
    <circle class="circle circle-1" :class="{ active }" cx="50%" cy="50%" r="50%" fill="currentColor" />
    <circle class="circle circle-2" :class="{ active, hidden: !active }" cx="50%" cy="50%" r="20%" fill="currentColor" />
    <circle class="circle circle-3" :class="{ active, hidden: !active }" cx="50%" cy="50%" r="30%" fill="currentColor" />
    <circle class="circle circle-4" :class="{ active, hidden: !active }" cx="50%" cy="50%" r="40%" fill="currentColor" />
  </svg>
</template>

<script lang="ts">
export default {
  name: "timekeep-icon-circles",
  props: {
    active: Boolean,
  },
};
</script>

<style scoped>
.circle {
  opacity: 0.1;
}

.circle.active {
  animation: pulse 3s infinite;
  animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
}

.circle.hidden {
  opacity: 0;
}

.circle-1 {
  animation-delay: 0s !important;
}

.circle-2 {
  animation-delay: 0.5s !important;
}

.circle-3 {
  animation-delay: 2s !important;
}

.circle-4 {
  animation-delay: 2.5s !important;
}

@keyframes pulse {
  0% {
    r: 50%;
  }
  50% {
    r: 10%;
  }
  100% {
    r: 50%;
  }
}
</style>
