// En el archivo sett.js

const state = {
    color: '#59c7f9', // Color por defecto
  };
  
  const mutations = {
    setColor(state, newColor) {
      state.color = newColor;
    },
  };
  
  const actions = {
    updateColor({ commit }, newColor) {
      commit('setColor', newColor);
    },
  };
  
  export default {
    state,
    mutations,
    actions,
  };
  