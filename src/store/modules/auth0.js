// auth.js

import { Auth0Client } from 'auth0-js';
import auth0Config from './auth0-config'; // Importa tu configuración de Auth0

const auth0 = new Auth0Client({
  domain: auth0Config.domain,
  clientID: auth0Config.clientId,
  redirectUri: window.location.origin,
});

const state = {
  isAuthenticated: false,
  user: null,
};

const mutations = {
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  SET_USER(state, user) {
    state.user = user;
  },
};

const actions = {
  async login({ commit }) {
    await auth0.loginWithRedirect();
  },

  async handleAuthentication({ commit }) {
    const authResult = await auth0.handleRedirectCallback();
    const user = await auth0.getUser();

    commit('SET_AUTHENTICATED', true);
    commit('SET_USER', user);
  },

  logout({ commit }) {
    auth0.logout();
    commit('SET_AUTHENTICATED', false);
    commit('SET_USER', null);
  },

  checkAuthentication({ commit }) {
    const isAuthenticated = auth0.isAuthenticated();
    commit('SET_AUTHENTICATED', isAuthenticated);

    if (isAuthenticated) {
      const user = auth0.getUser();
      commit('SET_USER', user);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
