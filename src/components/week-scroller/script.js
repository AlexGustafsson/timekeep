export default {
  name: 'week-scroller',
  computed: {
    weeks() {
      const weeks = [];
      for (let i = -2; i <= 2; i++) {
        let {year, week} = this.value;
        if (week + i > 52) {
          year++;
          week = (week + i) % 52
        } else if (week + i < 1) {
          year--;
          week = 53 + i;
        } else {
          week += i;
        }

        weeks.push({week, year});
      }
      return weeks;
    }
  },
  methods: {
    weekChanged(week) {
      this.$emit('input', week);
    },
    nextWeek() {
      let {year, week} = this.value;
      if (week + 1 > 52) {
        year++;
        week = 1;
      } else {
        week++;
      }

      this.$emit('input', {year, week});
    },
    previousWeek() {
      let {year, week} = this.value;
      if (week - 1 < 1) {
        year--;
        week = 52;
      } else {
        week--;
      }

      this.$emit('input', {year, week});
    }
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
};
