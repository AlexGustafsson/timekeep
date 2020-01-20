import {default as FormInput} from '../form-input/model.vue';

export default {
  name: 'modal-timekeep',
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
