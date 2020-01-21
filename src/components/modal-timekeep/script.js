import {default as FormInput} from '../form-input/model.vue';

export default {
  name: 'modal-timekeep',
  methods: {
    close() {
      this.$modal.close();
    }
  },
  props: {
    timekeep: {
      type: Object,
      required: true
    }
  },
  components: {
    FormInput
  }
};
