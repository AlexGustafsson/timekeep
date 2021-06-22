<template>
  <div class="page-settings">
    <h1>Settings</h1>
    <button @click="nuke">Nuke store</button>
  </div>
</template>

<script lang="ts">
  import {Vue} from "vue-class-component";

  class SettingsPage extends Vue {
    async nuke() {
      await this.$store.nuke();
      window.location.replace("/");
    }
  }
  export {SettingsPage as default};
</script>
