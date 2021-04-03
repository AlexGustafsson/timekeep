// import Timekeep from '@/state/timekeep';
import { Vue } from "vue-class-component";

//import {Card, WeekScroller} from '../../components';
// import {UniversalDate} from '../../utils';

type Week = {
  year: number;
  week: number;
  day: number;
};

export default class HomePage extends Vue {
  week: Week = {
    year: 2021,
    week: 14,
    day: 5,
  };

  // activeTimekeep: Timekeep | null = null;

  // cardClicked(timekeep: Timekeep) {
  //   console.log("clicked");
  //   // this.$store.toggleCounting(timekeep);
  // }
}
