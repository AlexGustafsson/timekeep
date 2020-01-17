/* globals window document alert prompt confirm localStorage Blob */
/* eslint-disable no-alert */

import {default as FormInput} from '../form-input/model.vue';
import {exportToExcel} from '../../utils';

export default {
  name: 'app',
  data() {
    return {
      form: {
        name: ''
      },
      menuIsOpen: false
    };
  },
  computed: {
    formDisabled() {
      return this.form.name === '';
    }
  },
  mounted() {
    this.$store.load();
    console.log(this.$store);
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

      if (clientX < offsetLeft)
        this.hideMenu();
    },
    toggleFavorite(timekeep) {
      timekeep.toggleFavorite();
    },
    async exportToExcel() {
      const blob = await exportToExcel(this.$store.state.timekeeps);

      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = 'timekeep.xlsx';
      element.click();
    },
    remove(timekeep) {
      const result = confirm(`Are you sure you want to remove '${timekeep.name}' permanently?`);
      if (result)
        this.$store.removeTimekeep(timekeep);
    },
    changeName(timekeep) {
      const name = prompt(`New name for '${timekeep.name}'`);
      if (name)
        timekeep.name = name;
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
    submit(event) {
      if (event)
        event.preventDefault(true);

      this.form.enabled = false;

      this.$store.addTimekeep(this.form.name);

      this.form.name = '';
      this.form.enabled = true;

      return false;
    }
  },
  components: {
    FormInput
  }
};
