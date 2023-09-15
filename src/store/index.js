// @/store.js

// Import necessary modules
import { createStore } from 'vuex';
import authModule from './modules/auth'; // Import custom authentication module
import createPersistedState from 'vuex-persistedstate'; // Import Vuex plugin for state persistence

// Create and export the Vuex store
export default createStore({
  // Define the initial state
  state: {
    userData: 'USER!', // Placeholder for user data
    loading: false, // Loading state
    menu: false, // Menu state
  },

  // Define mutations to modify state
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
  },

  // Define actions for performing asynchronous tasks
  actions: {
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
      console.log('socketStart');
      //socket io realtime server 


      
    }
  },

  // Define getters to retrieve state data
  getters: {
    // Getter to check if the application is in a loading state
    isLoading(state) {
      return state.loading;
    },

    // Getter to retrieve the menu state
    getMenuState(state) {
      return state.menu;
    },
  },

  // Register modules (in this case, the 'auth' module)
  modules: {
    auth: authModule, // Register the authentication module in the store as 'auth'
    // Other store modules if you have them
  },

  // Use a Vuex plugin for state persistence (e.g., localStorage)
  plugins: [createPersistedState()],
});
