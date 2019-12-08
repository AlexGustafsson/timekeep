import humanizeDuration from 'humanize-duration';

export default {
  name: 'card',
  computed: {
    prettyTime() {
      return humanizeDuration(this.time * 1000, {largest: 2});
    },
    prettyPrevious() {
      return humanizeDuration(this.previous * 1000, {largest: 2});
    },
    classes() {
      // Dummy hash for assigning color
      const hash = Number(this.name.substr(0, 10).split('').map(x => x.charCodeAt(0).toString()).join(''));
      const colors = 4;
      const color = Math.round(hash % colors) + 1;

      return [`color${color}`];
    }
  },
  methods: {
    remove() {
      this.$emit('remove');
    }
  },
  props: {
    name: String,
    time: Number,
    previous: Number,
    focused: {
      type: Boolean,
      default: false
    }
  }
};
