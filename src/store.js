/* globals window */

import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    timekeepings: state.timekeepings
  })
});

// Install plugin for state management
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timekeepings: [],
    timer: null,
    activeId: null
  },
  mutations: {
    addTimekeep(state, name) {
      state.timekeepings.push({
        id: state.timekeepings.length,
        name,
        time: 0,
        previous: 0
      });
    },
    removeTimekeep(state, id) {
      state.timekeepings = state.timekeepings.filter(x => x.id !== id);
    },
    increaseTime(state, id, time) {
      state.timekeepings[id].time++;
    }
  },
  actions: {
    async addTimekeep({commit, state}, name) {
      if (!name || name === '')
        throw new Error('Cannot create a timekeep without a name');

      const duplicates = state.timekeepings.filter(x => x.name === name);
      if (duplicates.length > 0)
        throw new Error('A timekeep with that name already exists');

      commit('addTimekeep', name);
    },
    async removeTimekeep({commit, state}, id) {
      if (id < 0 || id >= state.timekeepings.length)
        throw new Error('There exists no timekeep with that ID');

      commit('removeTimekeep', id);
    },
    async toggleTick({commit, state}, id) {
      if (id < 0 || id >= state.timekeepings.length)
        throw new Error('There exists no timekeep with that ID');

      state.timer = clearInterval(state.timer);
      if (id === state.activeId) {
        state.activeId = null
      } else {
        const timekeep = state.timekeepings.filter(x => x.id === id);
        state.activeId = id;
        state.timer = setInterval(() => {
          commit('increaseTime', id);
        }, 1000);
      }
    }
  },
  plugins: [vuexLocal.plugin]
});
