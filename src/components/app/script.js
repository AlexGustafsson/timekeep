/* globals window document confirm */
/* eslint-disable no-alert */

import {exportToExcel} from '../../utils';

import {default as FormInput} from '../form-input/model.vue';
import {default as Modal} from '../modal/model.vue';
import {default as ModalTimekeep} from '../modal-timekeep/model.vue';

export default {
  name: 'app',
  data() {
    return {
      form: {
        name: '',
        resetFavoritesEachWeek: false
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
    this.form.resetFavoritesEachWeek = this.$store.options.resetFavoritesEachWeek;
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
      this.$modal.show(ModalTimekeep, {timekeep});
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
  watch: {
    'form.resetFavoritesEachWeek': function(newValue, oldValue) {
      this.$store.options.resetFavoritesEachWeek = newValue;
    }
  },
  components: {
    FormInput,
    Modal,
    ModalTimekeep
  }
};
