import Vue from 'vue';
import Vuex from 'vuex';
//import router from '../router/router';

Vue.use(Vuex);

export default new Vuex.Store({
  // status ->
  //  -1 not found
  //  0 not selected
  //  1 available
  //  2 loading/searching
  state: {},
  mutations: {
    // saveCoins(state, payload) {
    //   // save list of coin data to state
    //   state.coinsSummary = payload.coinsSummary;
    // },
  },
  actions: {
    // async fetchCoinsSummary({ commit, state }) {
    //   // fetches information on all of the coins
    //   commit('saveCoins', {
    //     coinsSummary: coinsSummary,
    //   });
    // },
  },
  getters: {
    coins(state) {
      return state.coinsSummary;
    },
  },
});
