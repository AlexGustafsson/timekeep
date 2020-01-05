/* globals localStorage */

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import Timekeep from './timekeep';

import {getYear, getWeek, getDay} from './utils';

const vuexLocal = new VuexPersistence({
  storage: localStorage,
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

      const now = {year: getYear(), week: getWeek(), day: getDay()};
      for (const year of Object.keys(timekeep.years)) {
        for (const week of Object.keys(timekeep.years[year])) {
          for (const day of Object.keys(timekeep.years[year][week])) {
            timekeep.years[year][week][day] = timekeep.years[year][week][day].map(x => new Date(x));
            const isCounting = timekeep.years[year][week][day].length % 2 !== 0;
            const isToday = year === now.year.toString() && week === now.week.toString() && day === now.day.toString();
            // Stop counting by the end of the day
            // Note that unless the state is manipulated, vuex will not update and save the patched state
            if (isCounting && !isToday) {
              const last = timekeep.years[year][week][day].slice(-1)[0];
              const end = new Date(last);
              end.setHours(23);
              end.setMinutes(59);
              end.setSeconds(59);
              end.setMilliseconds(59);
              timekeep.years[year][week][day].push(end);
            }
          }
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
      if (state.activeId && state.activeId === timekeep.id)
        state.activeId = null;

      state.timekeeps = state.timekeeps.filter(x => x !== timekeep);
    },
    toggleCounting(state, timekeep) {
      if (state.activeId && state.activeId !== timekeep.id) {
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
    },
    changeName(state, {timekeep, name}) {
      timekeep.name = name;
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
      if (!state.timekeeps.includes(timekeep))
        throw new Error('No such timekeep in the store');

      commit('removeTimekeep', timekeep);
    },
    async toggleCounting({commit, state}, timekeep) {
      if (!state.timekeeps.includes(timekeep))
        throw new Error('No such timekeep in the store');

      commit('toggleCounting', timekeep);
    },
    async toggleFavorite({commit, state}, timekeep) {
      if (!state.timekeeps.includes(timekeep))
        throw new Error('No such timekeep in the store');

      commit('toggleFavorite', timekeep);
    },
    async changeName({commit, state}, {timekeep, name}) {
      if (!name || name === '')
        throw new Error('Cannot change name to be empty');

      const duplicates = state.timekeeps.filter(x => x.name === name);
      if (duplicates.length > 0)
        throw new Error('A timekeep with that name already exists');

      commit('changeName', {timekeep, name});
    }
  },
  plugins: [vuexLocal.plugin]
});
