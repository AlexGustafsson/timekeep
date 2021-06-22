<template>
  <div class="flex flex-col p-4 rounded-2xl bg-white">
    <header class="relative flex flex-row">
      <div class="flex items-center text-lg">
        <slot name="icon" />
      </div>
      <input type="text" class="text-lg ml-4 flex-grow" :placeholder="placeholder" :value="modelValue" @input="update" @keyup.enter="$emit('submit')" />
    </header>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

class Props {
  modelValue!: string;
  placeholder!: string;
}

@Options({ emits: ["update:modelValue", "submit"] })
class TimekeepInput extends Vue.with(Props) {
  update(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    this.$emit("update:modelValue", input.value);
  }
}
export {TimekeepInput as default}
</script>
