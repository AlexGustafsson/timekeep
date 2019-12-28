import {Card, FormInput, WeekScroller} from '../../components';
import {getWeek, getDay, getYear} from '../../utils';

export default {
  name: 'home-page',
  data() {
    return {
      form: {
        enabled: true,
        name: ''
      },
      week: {
        year: getYear(),
        week: getWeek(),
        day: getDay()
      }
    };
  },
  methods: {
    cardClicked(timekeep) {
      this.$store.dispatch('toggleCounting', timekeep).catch(error => {
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
    FormInput,
    WeekScroller
  }
};
