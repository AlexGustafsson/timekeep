import {Card, FormInput, WeekScroller} from '../../components';
import {exportToCSV, getWeek, getDay, getYear} from '../../utils';

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
  computed: {
    classes() {
      console.log(this.week);
      if (this.$store.state.timekeeps.length === 1)
        return ['cards1'];
      else if (this.$store.state.timekeeps.length === 2)
        return ['cards2'];
      else if (this.$store.state.timekeeps.length === 3)
        return ['cards3'];

      return [];
    }
  },
  methods: {
    cardClicked(timekeep) {
      this.$store.dispatch('toggleCounting', timekeep).catch(error => {
        alert(error);
      });
    },
    cardRemove(timekeep) {
      this.$store.dispatch('removeTimekeep', timekeep).catch(error => {
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
    },
    exportTimekeeps() {
      const content = exportToCSV(this.$store);

      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
      element.setAttribute('download', 'timekeeps.csv');

      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  },
  components: {
    Card,
    FormInput,
    WeekScroller
  }
};
