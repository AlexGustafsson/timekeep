<template>
  <div class="page page-edit">
    <header>
      <ion-stopwatch />
      <h1>Dashboard</h1>
      <h2>- {{ name }}</h2>
    </header>

    <header v-if="projectId" class="right">
      <timekeep-icon class="clickable"><ion-stopwatch /></timekeep-icon>
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
    <timekeep-input placeholder="Add a tag">
      <template v-slot:icon>
        <ion-tag />
      </template>
    </timekeep-input>

    <!-- Notes -->
    <timekeep-notebook v-model:notes="notes" />

    <footer class="right">
      <timekeep-icon @click="save" tooltip="Save" :active="saving" :class="{ clickable: !saving, primary: !saving, inactive: saving }"><ion-save /></timekeep-icon>
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
  tags = [];
  saving = false;

  mounted() {
    console.log(this.projectId);
  }

  async save() {
    if (this.saving) return;

    this.saving = true;

    if (this.createNew) {
      try {
        const project = await this.$store.createProject({ name: this.name, group: this.group });
        console.log(project);
        this.$router.replace({ name: "edit", params: { projectId: project._id } });
        this.saving = false;
      } catch (error) {
        console.log(error);
        this.saving = false;
      }
    } else {
      // TODO: Update
    }
  }
}
</script>

<style scoped>
@import "../style/page.css";

.page-edit > header .timekeep-icon {
  margin: 0 10px;
}
</style>
