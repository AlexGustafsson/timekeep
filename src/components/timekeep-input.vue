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
import { Vue, Options } from "vue-class-component";

class Props {
  modelValue!: string;
  placeholder!: string;
}

@Options({ emits: ["update:modelValue"] })
export default class TimekeepInput extends Vue.with(Props) {
  update(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    this.$emit("update:modelValue", input.value);
  }
}
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
  display: flex;
  align-items: center;
  font-size: 22px;
}

.timekeep-input > header > input {
  border: none;
  outline: none;
  font-size: 22px;
  margin-left: 15px;
  flex-grow: 1;
}
</style>
