/* globals window */

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import Timekeep from './timekeep';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    timekeeps: state.timekeeps
  }),
  saveState: (key, state) => {
    localStorage.setItem(key, JSON.stringify(state));
  },
  restoreState: key => {
    const state = JSON.parse(localStorage.getItem(key) || '{}');

    const timekeeps = (state.timekeeps || []).map(x => new Timekeep(x));
    let activeId = null;
    for (const timekeep of timekeeps) {
      if (!timekeep.years)
        break;

      for (const year of Object.keys(timekeep.years)) {
        for (const week of Object.keys(timekeep.years[year])) {
          for (const day of Object.keys(timekeep.years[year][week]))
            timekeep.years[year][week][day] = timekeep.years[year][week][day].map(x => new Date(x));
        }
      }

      if (timekeep.counting)
        activeId = timekeep.id;
    }

    return {timekeeps, activeId};
  }
});

// Install plugin for state management
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timekeeps: [],
    activeId: null
  },
  mutations: {
    addTimekeep(state, name) {
      state.timekeeps.push(new Timekeep({name}));
    },
    removeTimekeep(state, timekeep) {
      if (state.activeId && state.activeId === timekeep.id) {
        state.activeId = null;
      }

      state.timekeeps = state.timekeeps.filter(x => x !== timekeep);
    },
    toggleCounting(state, timekeep) {
      if (state.activeId && state.activeId != timekeep.id) {
        const activeTimekeep = state.timekeeps.find(x => x.id === state.activeId);
        activeTimekeep.toggleCounting();
        state.timekeeps[state.timekeeps.indexOf(activeTimekeep)] = activeTimekeep;
        state.activeId = null;
      }

      timekeep.toggleCounting();
      state.timekeeps[state.timekeeps.indexOf(timekeep)] = timekeep;

      if (timekeep.counting)
        state.activeId = timekeep.id;
      else
        state.activeId = null;
    },
    toggleFavorite(state, timekeep) {
      timekeep.toggleFavorite();
      state.timekeeps[state.timekeeps.indexOf(timekeep)] = timekeep;
    }
  },
  actions: {
    async addTimekeep({commit, state}, name) {
      if (!name || name === '')
        throw new Error('Cannot create a timekeep without a name');

      const duplicates = state.timekeeps.filter(x => x.name === name);
      if (duplicates.length > 0)
        throw new Error('A timekeep with that name already exists');

      commit('addTimekeep', name);
    },
    async removeTimekeep({commit, state}, timekeep) {
      if (state.timekeeps.indexOf(timekeep) === -1)
        throw new Error('No such timekeep in the store');

      commit('removeTimekeep', timekeep);
    },
    async toggleCounting({commit, state}, timekeep) {
      if (state.timekeeps.indexOf(timekeep) === -1)
        throw new Error('No such timekeep in the store');

      commit('toggleCounting', timekeep);
    },
    async toggleFavorite({commit, state}, timekeep) {
      if (state.timekeeps.indexOf(timekeep) === -1)
        throw new Error('No such timekeep in the store');

      commit('toggleFavorite', timekeep);
    }
  },
  plugins: [vuexLocal.plugin]
});
