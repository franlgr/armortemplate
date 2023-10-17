import { createStore } from 'vuex';
import authModule from './modules/auth';
import createPersistedState from 'vuex-persistedstate';
import socketModule from './modules/chat';
import cartModule from './modules/cart';
import settModule from './modules/sett'; // Import the new settings Vuex module
import FeathersClient from '@/FeathersClient'; // Import FeathersClient

export default createStore({
  state: {
    userData: 'USER!', // Placeholder for user data
    loading: false, // Loading state
    menu: false, // Menu state,
    settings: {},
  },
  mutations: {
    // Mutation to toggle the menu state
    setToggleMenu(state) {
      state.menu = !state.menu;
    },
    hiddenMenuMutation(state) {
      state.menu = false;
    },
    // Mutation to set the loading state
    setLoading(state, payload) {
      state.loading = payload;
    },
    setSettings(state, payload) {
      state.settings = payload;
    },
  },
  actions: {
    async fetchSettings({ commit }) {
      console.log('fetchSettings');
      // setLoading(true);
      try {
        const response = await FeathersClient.service('settings').find({
          query: {
            $limit: 1,
          },
        });
        // setLoading(false);
        console.log('getSettings', response);
        commit('setSettings', response.data[0]);
        // this.$i18n.locale = response.data[0].leng;
      } catch (error) {
        console.log('getSettings error', error);
        // setLoading(false);
      }
    },

    // Example action to log user data
    testAction({ state }) {
      console.log(state.userData);
    },
    // Action to toggle the menu, commits the 'setToggleMenu' mutation
    toggleMenu({ commit }) {
      commit('setToggleMenu');
    },
    hiddenMenu({ commit }) {
      commit('hiddenMenuMutation');
    },
    loadingSet({ commit }, payload) {
      commit('setLoading', payload);
    },
    socketStart({ commit }) {
      // ... Create a socket connection or perform other actions
    },
  },
  getters: {
    // Getter to check if the application is in a loading state
    isLoading(state) {
      return state.loading;
    },
    // Getter to retrieve the menu state
    getMenuState(state) {
      return state.menu;
    },
    getSettings(state) {
      return state.settings;
    },
  },
  modules: {
    auth: authModule, // Register the authentication module in the store as 'auth'
    chat: socketModule,
    cart: cartModule,
    sett: settModule, // Register the new settings Vuex module
    // Other store modules if you have them
  },
  plugins: [createPersistedState()],
});
