/* globals window document confirm alert */
/* eslint-disable no-alert */

import {exportToExcel} from '../../utils';

import {default as FormInput} from '../form-input/model.vue';
import {default as Modal} from '../modal/model.vue';
import {default as ModalTimekeep} from '../modal-timekeep/model.vue';
import {default as ModalGroup} from '../modal-group/model.vue';

export default {
  name: 'app',
  data() {
    return {
      timekeepForm: {
        name: ''
      },
      groupForm: {
        name: ''
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
    }
  },
  mounted() {
    this.$store.load();
    this.optionsForm.resetFavoritesEachWeek = this.$store.options.resetFavoritesEachWeek;
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
      const blob = await exportToExcel(this.$store.timekeeps);

      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = 'timekeep.xlsx';
      element.click();
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
    }
  },
  watch: {
    'optionsForm.resetFavoritesEachWeek': function(newValue, oldValue) {
      this.$store.options.resetFavoritesEachWeek = newValue;
    }
  },
  components: {
    FormInput,
    Modal,
    ModalTimekeep
  }
};
