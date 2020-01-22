import {default as FormInput} from '../form-input/model.vue';

export default {
  name: 'modal-group',
  data() {
    // A map of all timekeeps mapped to whether or not they are active in this group
    const timekeeps = {};
    for (const timekeep of this.$store.timekeeps)
      timekeeps[timekeep.id] = this.group.includes(timekeep);

    return {timekeeps};
  },
  methods: {
    close() {
      this.$modal.close();
    },
    toggleTimekeep(active, timekeep) {
      if (active)
        this.group.add(timekeep);
      else
        this.group.remove(timekeep);
    }
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  components: {
    FormInput
  }
};
