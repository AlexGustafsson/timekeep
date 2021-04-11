<template>
  <div class="page page-edit">
    <header>
      <ion-stopwatch />
      <h1>{{ createNew ? "New Project" : "Details" }}</h1>
      <h2>{{ createNew ? (name === "" ? "" : `- ${name}`) : `- ${name}` }}</h2>
      <router-link :to="{ name: 'create' }" v-if="!createNew"><timekeep-fab tooltip="Add Project" /></router-link>
    </header>

    <header v-if="projectId" class="right">
      <timekeep-icon class="clickable" :style="{ color }"><ion-stopwatch /></timekeep-icon>
      <timekeep-icon class="clickable negative"><ion-delete /></timekeep-icon>
    </header>

    <timekeep-showcase v-if="projectId">
      <timekeep-showcase-item primary="42m 32s" secondary="Today" />
      <timekeep-showcase-item primary="12h 41m" secondary="This Week" />
      <timekeep-showcase-item primary="1d 11h 51m" secondary="Total" />
    </timekeep-showcase>

    <!-- Project name -->
    <timekeep-input v-model="name" placeholder="The project's name">
      <template v-slot:icon>
        <p>Name</p>
      </template>
    </timekeep-input>

    <!-- Project group -->
    <timekeep-input v-model="group" placeholder="The project's optional group">
      <template v-slot:icon>
        <p>Group</p>
      </template>
    </timekeep-input>

    <!-- Project tags -->
    <timekeep-input placeholder="Add a tag" @submit="addTag" v-model="tagInput">
      <template v-slot:icon>
        <ion-tag />
      </template>
      <template v-slot:footer>
        <div class="tag-container">
          <p v-for="tag in tags" :key="tag.id" :style="{ backgroundColor: tag.color }">{{ tag.name }}</p>
        </div>
      </template>
    </timekeep-input>

    <!-- Notes -->
    <timekeep-notebook v-model:notes="notes" />

    <footer class="right">
      <timekeep-icon @click="save" tooltip="Save" :active="saving" :class="{ clickable: !saving, primary: !saving, inactive: saving }"
        ><ion-save
      /></timekeep-icon>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from "vue-class-component";

import IonStopwatch from "../components/ion-icons/stopwatch.vue";
import IonDelete from "../components/ion-icons/delete.vue";
import IonTag from "../components/ion-icons/tag.vue";
import IonSave from "../components/ion-icons/save.vue";
import TimekeepIcon from "../components/timekeep-icon/model.vue";
import TimekeepShowcase from "../components/timekeep-showcase.vue";
import TimekeepShowcaseItem from "../components/timekeep-showcase-item.vue";
import TimekeepInput from "@/components/timekeep-input.vue";
import TimekeepNotebook from "@/components/timekeep-notebook.vue";
import TimekeepFab from "@/components/timekeep-fab.vue";

import { Document, Project } from "@/plugins/store";
import { colorHash } from "@/utils/color";

const components = {
  IonStopwatch,
  IonDelete,
  IonTag,
  IonSave,
  TimekeepIcon,
  TimekeepShowcase,
  TimekeepShowcaseItem,
  TimekeepInput,
  TimekeepNotebook,
  TimekeepFab,
};

class Props {
  projectId = prop<string | null>({ default: null });
  createNew = prop<boolean>({ default: false });
}

@Options({ components })
export default class EditPage extends Vue.with(Props) {
  notes = [];
  name = "";
  group = "";
  tagInput = "";
  tags = [{ id: 0, name: "Development", color: "rgba(20, 20, 100, 0.3)" }];
  color = "";
  saving = false;
  project: Document<Project> | null = null;

  async mounted(): Promise<void> {
    await this.fetchData();
  }

  async navigated(): Promise<void> {
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    if (this.projectId) {
      try {
        this.project = await this.$store.get<Project>(this.projectId);
        this.name = this.project.data.name;
        this.group = this.project.data.group ?? "";
        this.color = colorHash(this.project.data.group ?? this.project.data.name);
      } catch (error) {
        console.log(error);
      }
    }
  }

  addTag(): void {
    const tag = { id: this.tags.length + 1, name: this.tagInput, color: colorHash(this.tagInput) };
    this.tags.push(tag);
    this.tagInput = "";
  }

  async save(): Promise<void> {
    if (this.saving) return;

    this.saving = true;

    if (this.createNew) {
      try {
        const project = await this.$store.createProject({ name: this.name, group: this.group });
        this.saving = false;
        this.$router.replace({ name: "edit", params: { projectId: project._id } });
      } catch (error) {
        console.log(error);
        this.saving = false;
      }
    } else if (this.projectId && this.project) {
      let changed = false;
      if (this.name !== this.project.data.name) {
        this.project.data.name = this.name;
        changed = true;
      }
      if (this.group !== this.project.data.group) {
        this.project.data.group = this.group;
        changed = true;
      }
      if (changed) {
        try {
          await this.$store.update<Project>(this.project);
          this.saving = false;
        } catch (error) {
          console.log(error);
          this.saving = false;
        }
      } else {
        this.saving = false;
      }
    }
  }
}
</script>

<style scoped>
@import "../style/page.css";

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
}
</style>
