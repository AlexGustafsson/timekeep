export default {
  name: 'form-input',
  data() {
    return {
      isFocused: false
    };
  },
  methods: {
    updateValue(event) {
      if (this.type === 'checkbox')
        this.$emit('input', event.target.checked);
      else
        this.$emit('input', event.target.value);
    },
    focused() {
      if (this.type === 'button')
        return;

      this.isFocused = true;
    },
    blurred() {
      if (this.type === 'button')
        return;

      this.isFocused = false;
    },
    clicked() {
      if (this.type !== 'button')
        return;
      if (this.disabled)
        return;

      this.$emit('click');
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Boolean]
  }
};
