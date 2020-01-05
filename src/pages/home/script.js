/* globals alert */
/* eslint-disable no-alert */

import {Card, WeekScroller} from '../../components';
import {getWeek, getDay, getYear} from '../../utils';

export default {
  name: 'home-page',
  data() {
    return {
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
    }
  },
  components: {
    Card,
    WeekScroller
  }
};
