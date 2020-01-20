export default {
  name: 'week-scroller',
  computed: {
    weeks() {
      const weeks = [];
      for (let i = -2; i <= 2; i++) {
        let {year, week, day} = this.value;
        if (week + i > 52) {
          year++;
          week = (week + i) % 52;
        } else if (week + i < 1) {
          year--;
          week = 53 + i;
        } else {
          week += i;
        }

        weeks.push({week, year, day});
      }
      return weeks;
    },
    days() {
      const days = [];
      for (let i = -2; i <= 2; i++) {
        let {day} = this.value;
        if (day + i > 6)
          day = (day + i) % 6;
        else if (day + i < 0)
          day = 7 + i;
        else
          day += i;

        days.push(day);
      }
      return days;
    }
  },
  methods: {
    weekChanged(week) {
      this.$emit('input', week);
    },
    dayChanged(day) {
      const {year, week} = this.value;
      this.$emit('input', {year, week, day});
    },
    nextWeek() {
      let {year, week, day} = this.value;
      if (week + 1 > 52) {
        year++;
        week = 1;
      } else {
        week++;
      }

      this.$emit('input', {year, week, day});
    },
    previousWeek() {
      let {year, week, day} = this.value;
      if (week - 1 < 1) {
        year--;
        week = 52;
      } else {
        week--;
      }

      this.$emit('input', {year, week, day});
    },
    nextDay() {
      let {year, week, day} = this.value;
      if (day + 1 > 6) {
        week++;
        day = 0;
      } else {
        day++;
      }

      if (week > 52) {
        year++;
        week = 1;
      }

      this.$emit('input', {year, week, day});
    },
    previousDay() {
      let {year, week, day} = this.value;
      if (day - 1 < 0) {
        week--;
        day = 6;
      } else {
        day--;
      }

      if (week < 1) {
        year--;
        week = 52;
      }

      this.$emit('input', {year, week, day});
    },
    dayLabel(day) {
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return labels[day];
    }
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
};
