<template>
  <div class="timekeep-input">
    <header>
      <div class="icon">
        <slot name="icon" />
      </div>
      <input type="text" :placeholder="placeholder" :value="modelValue" @input="update" />
    </header>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: String,
    placeholder: String,
  },
  methods: {
    update(event: InputEvent) {
      const input = event.target as HTMLInputElement;
      this.$emit("update:modelValue", input.value);
    },
  },
  emits: ["update:modelValue"],
});
</script>

<style scoped>
.timekeep-input {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  background-color: white;
}

.timekeep-input > header {
  position: relative;
  display: flex;
  flex-direction: row;
}

.timekeep-input > header > .icon {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  user-select: none;
}

.timekeep-input > header > input {
  border: none;
  outline: none;
  font-size: 22px;
  padding-left: 48px;
  flex-grow: 1;
}
</style>
