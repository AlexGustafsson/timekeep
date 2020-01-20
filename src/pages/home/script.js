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
      if (this.activeTimekeep)
        this.activeTimekeep.addCheckpoint();

      if (timekeep !== this.activeTimekeep) {
        timekeep.addCheckpoint();
        this.activeTimekeep = timekeep;
      }
    }
  },
  components: {
    Card,
    WeekScroller
  }
};
