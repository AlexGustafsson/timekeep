/* globals localStorage */
import {reactive, watch} from '@vue/composition-api';

import Timekeep from './timekeep';
import Group from './group';

const STORAGE_NAME = 'timekeeper';

const VERSION = {
  '0.0.1': 1
};

const CURRENT_VERSION = VERSION['0.0.1'];

export default class Store {
  constructor() {
    this.timekeeps = [];
    this.groups = [];
    this.version = CURRENT_VERSION;
    this.options = {
      resetFavoritesEachWeek: false
    };
  }

  static install(vue) {
    const store = new Store();
    const instance = reactive(store);
    watch(() => {
      instance.save();
    });

    vue.prototype.$store = instance;
  }

  load() {
    const store = localStorage.getItem(STORAGE_NAME);
    if (!store)
      return;

    const state = JSON.parse(store);
    if (state.version === VERSION['0.0.1']) {
      this.timekeeps = state.timekeeps.map(Timekeep.parse);
      this.groups = state.groups;
      this.version = state.version;
      this.options = state.options;
    } else {
      throw new Error(`Unsupported store version '${state.version}'`);
    }
  }

  save() {
    const serialized = {
      timekeeps: this.timekeeps.map(Timekeep.serialize),
      groups: this.groups.map(Group.serialize),
      version: this.version,
      options: this.options
    };

    localStorage.setItem(STORAGE_NAME, JSON.stringify(serialized));
  }

  addTimekeep(name) {
    this.timekeeps.push(new Timekeep(name));
  }

  removeTimekeep(timekeep) {
    this.timekeeps.splice(this.timekeeps.findIndex(x => x.id === timekeep.id), 1);
  }

  nuke() {
    localStorage.removeItem(STORAGE_NAME);
  }
}
