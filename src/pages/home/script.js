import {Card, FormInput} from '../../components';

export default {
  name: 'home-page',
  data() {
    return {
      form: {
        enabled: true,
        name: ''
      }
    };
  },
  computed: {
    classes() {
      if (this.$store.state.timekeepings.length === 1)
        return ['cards1'];
      else if (this.$store.state.timekeepings.length === 2)
        return ['cards2'];
      else if (this.$store.state.timekeepings.length === 3)
        return ['cards3'];

      return [];
    }
  },
  methods: {
    cardClicked(id) {
      this.$store.dispatch('toggleTick', id).catch(error => {
        alert(error);
      });
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
    Card,
    FormInput
  }
};
