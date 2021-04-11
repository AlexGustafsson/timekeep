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

<script lang="ts">
import { Vue, Options } from "vue-class-component";

import IonNote from "./ion-icons/note.vue";
import IonRemove from "./ion-icons/remove.vue";
import IonAdd from "./ion-icons/add.vue";
import UniversalDate from "../utils/universal-date";

const components = {
  IonNote,
  IonRemove,
  IonAdd,
};

import { ref } from "vue";

interface Note {
  id: string;
  text: string;
  date: UniversalDate;
}

class Props {
  notes!: Note[];
}

@Options({ components, emits: ["update:notes"] })
export default class TimekeepNotebook extends Vue.with(Props) {
  input = (ref<HTMLTextAreaElement | null>(null) as unknown) as HTMLTextAreaElement | null;

  add(): void {
    if (this.input === null) return;

    const note: Note = { id: this.notes.length.toString(), text: this.input.value, date: new UniversalDate() };
    const notes = [note, ...this.notes];
    this.input.value = "";
    this.$emit("update:notes", notes);
  }

  remove(note: Note): void {
    const notes = this.notes.filter((x) => x.id !== note.id);
    this.$emit("update:notes", notes);
  }

  change(note: Note): void {
    console.log(note.id);
    this.$emit("update:notes", this.notes);
  }
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
