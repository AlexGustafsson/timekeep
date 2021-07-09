<template>
  <div class="timekeep-notebook">
    <ion-note class="top-left" />
    <main>
      <ul>
        <li>
          <p>Today</p>
          <textarea ref="input" placeholder="Write a note on today's work..." />
          <ion-add @click="add" tooltip="Add" />
        </li>
        <li v-for="note in notes" :key="note.id">
          <p>
            {{
              note.date.isToday()
                ? "Today"
                : `${note.date.dayOfWeekString} w${note.date.week} ${note.date.year}-${note.date.month
                    .toString()
                    .padStart(2, "0")}-${note.date.day.toString().padStart(2, "0")}`
            }}
          </p>
          <textarea :value="note.text" @change="change(note)" />
          <ion-remove @click="remove(note)" tooltip="Remove" />
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import IonNote from "./ion-icons/note.vue";
import IonRemove from "./ion-icons/remove.vue";
import IonAdd from "./ion-icons/add.vue";
import UniversalDate from "../utils/universal-date";

interface Note {
  id: string;
  text: string;
  date: UniversalDate;
}

interface Props {
  notes: Note[];
}
const props = defineProps<Props>();

const emit = defineEmits<{
   (e: "update:notes", notes: Note[]): void
 }>()

const notes = ref<Note[]>([]);
const input = ref<HTMLTextAreaElement | null>(null);

function add(): void {
  if (input.value === null) return;

  const note: Note = { id: notes.value.length.toString(), text: input.value, date: new UniversalDate() };
  notes.value = [note, ...notes.value];
  input.value.value = "";
  emit("update:notes", notes.value);
}

function remove(note: Note): void {
  notes.value = notes.value.filter((x) => x.id !== note.id);
  emit("update:notes", notes.value);
}

function change(note: Note): void {
  // TODO: Implement
  emit("update:notes", notes.value);
}
</script>

<style scoped>
.timekeep-notebook {
  position: relative;
  padding: 15px;
  padding-top: 64px;
  background-color: white;
  border-radius: 10px;
}

.timekeep-notebook .top-left {
  position: absolute;
  top: 15px;
  left: 15px;
}

.timekeep-notebook main {
  max-height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}

.timekeep-notebook li {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  margin: 5px 0;
}

.timekeep-notebook li textarea {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0;
  margin: 0 20px;
  resize: vertical;
}

.timekeep-notebook li p {
  color: #808080;
  text-align: center;
  width: 120px;
}

.timekeep-notebook li .ion-icon {
  cursor: pointer;
}
</style>
