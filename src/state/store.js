/* globals localStorage */
import {reactive, watch} from '@vue/composition-api';

import {UniversalDate} from '../utils';

import Timekeep from './timekeep';
import TimekeepGroup from './group';

const STORAGE_NAME = 'timekeep';

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
    this.lastVisited = new UniversalDate();
    this.activeTimekeep = null;
    this.activeGroup = null;
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
      this.groups = state.groups.map(x => TimekeepGroup.parse(x, this.timekeeps));
      this.version = state.version;
      this.options = state.options;
      this.lastVisited = new UniversalDate(state.lastVisited);
      this.activeTimekeep = state.activeTimekeep ? this.timekeeps.find(x => x.id === state.activeTimekeep) : null;
      this.activeGroup = state.activeGroup ? this.groups.find(x => x.id === state.activeGroup) : null;
    } else {
      throw new Error(`Unsupported store version '${state.version}'`);
    }

    // Reset favorites if it's a new week and the option is enabled
    const today = new UniversalDate();
    if (this.options.resetFavoritesEachWeek && !this.lastVisited.isSameWeek(today)) {
      for (const timekeep of this.timekeeps)
        timekeep.favorite = false;
    }
  }

  save() {
    const serialized = {
      timekeeps: this.timekeeps.map(Timekeep.serialize),
      groups: this.groups.map(TimekeepGroup.serialize),
      version: this.version,
      options: this.options,
      lastVisited: new UniversalDate().timestamp,
      activeTimekeep: this.activeTimekeep ? this.activeTimekeep.id : null,
      activeGroup: this.activeGroup ? this.activeGroup.id : null
    };

    localStorage.setItem(STORAGE_NAME, JSON.stringify(serialized));
  }

  toggleCounting(timekeep) {
    if (timekeep === this.activeTimekeep) {
      this.activeTimekeep.addCheckpoint();
      this.activeTimekeep = null;
    } else {
      if (this.activeTimekeep) {
        this.activeTimekeep.addCheckpoint();
        this.activeTimekeep = null;
      }

      timekeep.addCheckpoint();
      this.activeTimekeep = timekeep;
    }
  }

  addTimekeep(name) {
    const duplicate = this.timekeeps.find(x => x.name === name);
    if (duplicate)
      throw new Error('A timekeep by that name already exists');

    this.timekeeps.push(new Timekeep(name));
  }

  addGroup(name) {
    const duplicate = this.groups.find(x => x.name === name);
    if (duplicate)
      throw new Error('A group by that name already exists');

    this.groups.push(new TimekeepGroup(name));
  }

  removeTimekeep(timekeep) {
    // Stop the timekeep from counting if it is active
    if (this.activeTimekeep && this.activeTimekeep.id === timekeep.id)
      this.activeTimekeep = null;

    // Remove the timekeep from any group it may exist in
    for (const group of this.groups)
      group.remove(timekeep);

    // Remove the timekeep
    this.timekeeps.splice(this.timekeeps.findIndex(x => x.id === timekeep.id), 1);
  }

  removeGroup(group) {
    // Remove the group as active if it was
    if (this.activeGroup && this.activeGroup.id === group.id)
      this.activeGroup = null;

    this.groups.splice(this.groups.findIndex(x => x.name === group.name), 1);
  }

  nuke() {
    localStorage.removeItem(STORAGE_NAME);
  }
}
