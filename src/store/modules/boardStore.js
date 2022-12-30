const boardStore = {
  namespaced: true,
  state: {
    isChange: false,
  },
  getters: {},
  mutations: {
    SET_IS_CHANGE: (state) => {
      state.isChange = !state.isChange;
    },
  },
  actions: {
    changeTrue({ commit }) {
     
      commit("SET_IS_CHANGE");
      
    },
  },
};

export default boardStore;
