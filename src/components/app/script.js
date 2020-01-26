/* globals window document confirm alert */
/* eslint-disable no-alert */

import {default as FormInput} from '../form-input/model.vue';
import {default as Modal} from '../modal/model.vue';
import {default as ModalTimekeep} from '../modal-timekeep/model.vue';
import {default as ModalGroup} from '../modal-group/model.vue';
import {default as ModalAbout} from '../modal-about/model.vue';
import {default as ModalExport} from '../modal-export/model.vue';

export default {
  name: 'app',
  data() {
    return {
      timekeepForm: {
        name: ''
      },
      groupForm: {
        name: '',
        activeGroup: null
      },
      optionsForm: {
        resetFavoritesEachWeek: false
      },
      menuIsOpen: false
    };
  },
  computed: {
    timekeepFormDisabled() {
      return this.timekeepForm.name === '';
    },
    groupFormDisabled() {
      return this.groupForm.name === '';
    },
    groupOptions() {
      return [{label: 'All', value: null}, ...this.$store.groups.map(x => ({label: x.name, value: x.id}))];
    }
  },
  mounted() {
    try {
      this.$store.load();
    } catch (error) {
      alert(`Unable to load saved state. Try to reset the application. The error was: "${error}"`);
      const backup = confirm('Do you want to export the data backup?');
      const backupStorage = this.$store.export();
      if (backup) {
        const element = document.createElement('a');
        element.href = URL.createObjectURL(backupStorage);
        element.download = 'timekeep-backup.txt';
        element.click();
      }
    }

    this.optionsForm.resetFavoritesEachWeek = this.$store.options.resetFavoritesEachWeek;
    this.groupForm.activeGroup = this.$store.activeGroup ? this.$store.activeGroup.id : null;
    this.$modal.initialize(this.$refs.modal);
  },
  methods: {
    openMenu() {
      this.menuIsOpen = true;
      window.addEventListener('mousedown', this.handleMouseClick);
    },
    hideMenu() {
      this.menuIsOpen = false;
      window.removeEventListener('mousedown', this.handleMouseClick);
    },
    toggleMenu() {
      if (this.menuIsOpen)
        this.hideMenu();
      else
        this.openMenu();
    },
    handleMouseClick(event) {
      const {clientX} = event;
      const {offsetLeft} = this.$refs.menu;

      if (clientX < offsetLeft && !this.$modal.showing)
        this.hideMenu();
    },
    toggleFavorite(timekeep) {
      timekeep.toggleFavorite();
    },
    async exportToExcel() {
      this.$modal.show(ModalExport);
    },
    removeTimekeep(timekeep) {
      const confirmed = confirm(`Are you sure you want to remove '${timekeep.name}' permanently?`);
      if (!confirmed)
        return;

      try {
        this.$store.removeTimekeep(timekeep);
      } catch (error) {
        alert(error);
      }
    },
    removeGroup(group) {
      const confirmed = confirm(`Are you sure you want to remove '${group.name}' permanently?`);
      if (!confirmed)
        return;

      try {
        this.$store.removeGroup(group);
      } catch (error) {
        alert(error);
      }
    },
    editTimekeep(timekeep) {
      this.$modal.show(ModalTimekeep, {timekeep});
    },
    editGroup(group) {
      this.$modal.show(ModalGroup, {group});
    },
    reset() {
      const confirmed = confirm('Are you sure you want to reset the application? Any state will be permanently lost.');

      if (confirmed) {
        // Remove state
        this.$store.nuke();
        // Reload page
        window.location.replace('/');
      }
    },
    addTimekeep(event) {
      if (event)
        event.preventDefault(true);

      this.timekeepForm.enabled = false;

      try {
        this.$store.addTimekeep(this.timekeepForm.name);

        this.timekeepForm.name = '';
      } catch (error) {
        alert(error);
      }

      this.timekeepForm.enabled = true;

      return false;
    },
    addGroup(event) {
      if (event)
        event.preventDefault(true);

      this.groupForm.enabled = false;

      try {
        this.$store.addGroup(this.groupForm.name);

        this.groupForm.name = '';
      } catch (error) {
        alert(error);
      }

      this.groupForm.name = '';
      this.groupForm.enabled = true;

      return false;
    },
    about() {
      this.$modal.show(ModalAbout);
    }
  },
  watch: {
    'optionsForm.resetFavoritesEachWeek': function(reset) {
      this.$store.options.resetFavoritesEachWeek = reset;
    },
    'groupForm.activeGroup': function(id) {
      if (id)
        this.$store.activeGroup = this.$store.groups.find(x => x.id === id);
      else
        this.$store.activeGroup = null;
    }
  },
  components: {
    FormInput,
    Modal
  }
};
