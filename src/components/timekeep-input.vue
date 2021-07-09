<template>
  <div class="flex flex-col p-4 rounded-2xl bg-white">
    <header class="relative flex flex-row">
      <div class="flex items-center text-lg">
        <slot name="icon" />
      </div>
      <input type="text" class="text-lg ml-4 flex-grow" :placeholder="placeholder" :value="modelValue" @input="update" @keyup.enter="submit" />
    </header>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string,
  placeholder: string
}

const props = defineProps<Props>();

const emit = defineEmits<{
   (e: "update:modelValue", value: number): void
   (e: "submit"): void
 }>()

function update(event: InputEvent): void {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", Number(input.value));
}

function submit(): void {
  emit("submit");
}

</script>
