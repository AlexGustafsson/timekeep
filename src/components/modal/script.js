export default {
  name: 'modal',
  data() {
    return {
      component: null,
      parameters: {},
      hide: true
    };
  },
  methods: {
    show(component, parameters) {
      this.component = component;
      this.parameters = parameters;
      this.hide = false;
    },
    close() {
      this.component = null;
      this.parameters = {};
      this.hide = true;
    }
  }
};
