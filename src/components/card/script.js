import humanizeDuration from 'humanize-duration';

export default {
  name: 'card',
  data() {
    return {
      timer: null,
      prettyTime: '',
      prettyPrevious: ''
    };
  },
  computed: {
    classes() {
      // Dummy hash for assigning color
      const hash = Number(this.timekeep.name.slice(0, 10).split('').map(x => x.charCodeAt(0).toString()).join(''));
      const colors = 4;
      const color = Math.round(hash % colors) + 1;

      return [`color${color}`];
    }
  },
  created() {
    this.timer = setInterval(this.update.bind(this), 500);
    this.update();
  },
  methods: {
    update() {
      this.prettyTime = humanizeDuration(Math.round(this.timekeep.getTime(this.week.year, this.week.week, this.week.day) / 1000) * 1000, {largest: 2});
      this.prettyPrevious = humanizeDuration(Math.round(this.timekeep.getTime(this.week.year, this.week.week) / 1000) * 1000, {largest: 2});
    }
  },
  watch: {
    'week': function () {
      this.update();
    }
  },
  props: {
    timekeep: {
      type: Object,
      required: true
    },
    focused: {
      type: Boolean,
      default: false
    },
    week: {
      type: Object,
      required: true
    }
  }
};
