import humanizeDuration from 'humanize-duration';

export default {
  name: 'card',
  computed: {
    prettyTime() {
      return humanizeDuration(this.time * 1000, {largest: 2});
    },
    prettyPrevious() {
      return humanizeDuration(this.previous * 1000, {largest: 2});
    }
  },
  props: {
    name: String,
    time: Number,
    previous: Number
  }
};
