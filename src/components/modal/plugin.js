export default class ModalPlugin {
  constructor() {
    this.element = null;
  }

  initialize(element) {
    this.element = element;
  }

  get showing() {
    return !this.element.hide;
  }

  show(component, parameters) {
    if (this.element)
      this.element.show(component, parameters);
  }

  close() {
    if (this.element)
      this.element.close();
  }

  static install(vue) {
    const instance = new ModalPlugin();
    vue.prototype.$modal = instance;
  }
}
