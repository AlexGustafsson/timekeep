import {Card, WeekScroller} from '../../components';
import {UniversalDate} from '../../utils';

export default {
  name: 'home-page',
  data() {
    const today = new UniversalDate();

    return {
      week: {
        year: today.year,
        week: today.week,
        day: today.dayOfWeek
      },
      activeTimekeep: null
    };
  },
  methods: {
    cardClicked(timekeep) {
      this.$store.toggleCounting(timekeep);
    }
  },
  components: {
    Card,
    WeekScroller
  }
};
