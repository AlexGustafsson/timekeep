<template>
  <div class="flex flex-col items-center justify-content-center p-5 mx-3">
    <slot></slot>
    <p class="mt-1">{{ primary }}</p>
    <p class="text-gray-400">{{ secondary }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  primary: string,
  secondary: string
}

defineProps<Props>();
</script>
