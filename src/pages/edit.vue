<template>
  <div class="page">
    <header class="page-header">
      <ion-stopwatch />
      <h1 class="page-title">{{ createNew ? "New Project" : "Details" }}</h1>
      <h2 class="page-subtitle">{{ createNew ? (name === "" ? "" : `- ${name}`) : `- ${name}` }}</h2>
      <router-link :to="{ name: 'create' }" v-if="!createNew"><timekeep-fab tooltip="Add Project" /></router-link>
    </header>

    <header v-if="projectId" class="right">
      <timekeep-icon class="clickable" :style="{ color }"><ion-stopwatch /></timekeep-icon>
      <timekeep-icon class="clickable negative"><ion-delete /></timekeep-icon>
    </header>

    <timekeep-showcase v-if="projectId" class="my-3">
      <timekeep-showcase-item primary="42m 32s" secondary="Today" />
      <timekeep-showcase-item primary="12h 41m" secondary="This Week" />
      <timekeep-showcase-item primary="1d 11h 51m" secondary="Total" />
    </timekeep-showcase>

    <!-- Project name -->
    <timekeep-input v-model="name" class="my-3" placeholder="The project's name">
      <template v-slot:icon>
        <p>Name</p>
      </template>
    </timekeep-input>

    <!-- Project group -->
    <timekeep-input v-model="group" class="my-3" placeholder="The project's optional group">
      <template v-slot:icon>
        <p>Group</p>
      </template>
    </timekeep-input>

    <!-- Project tags -->
    <timekeep-input placeholder="Add a tag" class="my-3" @submit="addTag" v-model="tagInput">
      <template v-slot:icon>
        <ion-tag />
      </template>
      <template v-slot:footer>
        <div class="tag-container">
          <p v-for="tag in tags" :key="tag.id" :style="{ backgroundColor: tag.color }" tooltip="Click to remove" @click="removeTag(tag)">{{ tag.name }}</p>
        </div>
      </template>
    </timekeep-input>

    <!-- Notes -->
    <timekeep-notebook v-model:notes="notes" class="my-3" />

    <footer class="page-footer">
      <timekeep-icon @click="save" tooltip="Save" :active="saving" :class="{ clickable: !saving, primary: !saving, inactive: saving }"
        ><ion-save
      /></timekeep-icon>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

import IonStopwatch from "@/components/ion-icons/stopwatch.vue";
import IonDelete from "@/components/ion-icons/delete.vue";
import IonTag from "@/components/ion-icons/tag.vue";
import IonSave from "@/components/ion-icons/save.vue";
import TimekeepIcon from "@/components/timekeep-icon/model.vue";
import TimekeepShowcase from "@/components/timekeep-showcase.vue";
import TimekeepShowcaseItem from "@/components/timekeep-showcase-item.vue";
import TimekeepInput from "@/components/timekeep-input.vue";
import TimekeepNotebook from "@/components/timekeep-notebook.vue";
import TimekeepFab from "@/components/timekeep-fab.vue";

import type { Document, Project, Tag } from "@/plugins/store";
import { colorHash } from "@/utils/color";

interface Props {
  projectId?: string,
  createNew: boolean
}

const props = withDefaults(defineProps<Props>(), {createNew: false});

const notes = ref([]);
const name = ref("");
const group = ref("");
const tagInput = ref("");
const tags = ref<Tag[]>([]);
const color = ref("");
const saving = ref(false);
const project = ref<Document<Project> | null>(null);

// TODO: Implement
// async function navigated(): Promise<void> {
//   await fetchData();
// }

// TODO: Implement
// async function mounted(): Promise<void> {
//   await fetchData();
// }

// TODO: Implement
async function fetchData(): Promise<void> {
//   if (projectId.value) {
//     try {
//       project.value = await store.get<Project>(projectId.value);
//       name.value = project.data.name;
//       group.value = project.data.group ?? "";
//       color.value = colorHash(project.data.group ?? project.data.name);
//       for (const tagName of project.data.tags) {
//         const tag = await store.getTag(tagName);
//         tags.value.push(tag!.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
}

function addTag(): void {
  if (tagInput.value.trim() == "") return;

  const tag = { id: tags.value.length + 1, name: tagInput.value.trim(), color: colorHash(tagInput.value.trim()), created: Date.now() };
  tags.value.push(tag);
  tagInput.value = "";
}

function removeTag(tag: Tag): void {
  tags.value = tags.value.filter(x => x.name != tag.name);
}

// TODO: Implement
async function save(): Promise<void> {
  // if (saving.value) return;

  // saving.value = true;

  // if (createNew.value) {
  //   try {
  //     const tags = new Set<string>();
  //     for (const tag of this.tags) {
  //       await store.createOrFetchTag(tag);
  //       tags.add(tag.name);
  //     }

  //     const project = await this.$store.createProject({ name: name.value, group: group.value, tags, color: "", favorite: false });
  //     saving.value = false;
  //     router.replace({ name: "edit", params: { projectId: project._id } });
  //   } catch (error) {
  //     console.log(error);
  //     saving.value = false;
  //   }
  // } else if (projectId.value && project.value) {
  //   let changed = false;
  //   if (name.value !== project.data.name) {
  //     project.data.name = name;
  //     changed = true;
  //   }
  //   if (group !== project.data.group) {
  //     project.data.group = group;
  //     changed = true;
  //   }
  //   if (changed) {
  //     try {
  //       await $store.update<Project>(project);
  //       saving = false;
  //     } catch (error) {
  //       console.log(error);
  //       saving = false;
  //     }
  //   } else {
  //     saving = false;
  //   }
  // }
}
</script>

<style scoped>
.page-edit > header .timekeep-icon {
  margin: 0 10px;
}

.page-edit > header > h2 {
  flex-grow: 1;
}

.page-edit .tag-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.page-edit .tag-container p {
  display: block;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
}
</style>
