export default {
  name: 'app',
  data() {
    return {
      menuIsOpen: false
    };
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
    remove(timekeep) {
      const result = window.confirm(`Are you sure you want to remove '${timekeep.name}' permanently?`);
      if (result) {
        this.$store.dispatch('removeTimekeep', timekeep).catch(error => {
          alert(error);
        });
      }
    }
  }
}
