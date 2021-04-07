<template>
  <svg class="timekeep-icon-circles" aria-hidden="true" role="img" width="32" height="32">
    <circle class="circle circle-1" cx="50%" cy="50%" r="50%" fill="currentColor" />
    <circle class="circle circle-2" cx="50%" cy="50%" r="20%" fill="currentColor" />
    <circle class="circle circle-3" cx="50%" cy="50%" r="30%" fill="currentColor" />
    <circle class="circle circle-4" cx="50%" cy="50%" r="40%" fill="currentColor" />
  </svg>
</template>

<style scoped>
.timekeep-icon-circles .circle {
  opacity: 0.1;
}

.timekeep-icon-circles .circle:not(:first-of-type) {
  opacity: 0;
}

.timekeep-icon-circles.active .circle {
  opacity: 0.1;
  animation: pulse 3s infinite;
  animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
}

.timekeep-icon-circles .circle-1 {
  animation-delay: 0s !important;
}

.timekeep-icon-circles .circle-2 {
  animation-delay: 0.5s !important;
}

.timekeep-icon-circles .circle-3 {
  animation-delay: 2s !important;
}

.timekeep-icon-circles .circle-4 {
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
