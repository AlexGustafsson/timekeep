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
      const hash = Number(this.timekeep.name.substr(0, 10).split('').map(x => x.charCodeAt(0).toString()).join(''));
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
    remove() {
      this.$emit('remove');
    },
    update() {
      this.prettyTime = humanizeDuration(Math.round(this.timekeep.getTimeToday() / 1000) * 1000, {largest: 2});
      this.prettyPrevious = humanizeDuration(Math.round(this.timekeep.getTimeYesterday() / 1000) * 1000, {largest: 2});
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
    }
  }
};
