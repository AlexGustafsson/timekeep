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
      this.$store.dispatch('toggleFavorite', timekeep).catch(error => {
        alert(error);
      });
    },
    async exportToExcel() {
      const buffer = await exportToExcel(this.$store.state.timekeeps);
      const bytes = new Uint8Array(buffer);
      const blob = new Blob([bytes], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = 'timekeep.xlsx';
      element.click();
    },
    remove(timekeep) {
      const result = window.confirm(`Are you sure you want to remove '${timekeep.name}' permanently?`);
      if (result) {
        this.$store.dispatch('removeTimekeep', timekeep).catch(error => {
          alert(error);
        });
      }
    },
    changeName(timekeep) {
      const name = prompt(`New name for '${timekeep.name}'`);
      this.$store.dispatch('changeName', {timekeep, name}).catch(error => {
        alert(error);
      });
    },
    reset() {
      const confirmed = confirm('Are you sure you want to reset the application? Any state will be permanently lost.')

      if (confirmed) {
        // Remove state
        localStorage.removeItem('vuex');
        // Reload page
        window.location.replace('/');
      }
    },
    submit(event) {
      if (event)
        event.preventDefault(true);

      this.form.enabled = false;
      this.$store.dispatch('addTimekeep', this.form.name).then(() => {
        this.form.name = '';
        this.form.enabled = true;
      }).catch(error => {
        alert(error);
        this.form.enabled = true;
      });

      return false;
    }
  },
  components: {
    FormInput
  }
}
