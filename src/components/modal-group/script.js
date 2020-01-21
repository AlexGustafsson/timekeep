import {default as FormInput} from '../form-input/model.vue';

export default {
  name: 'modal-group',
  methods: {
    close() {
      this.$modal.close();
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
