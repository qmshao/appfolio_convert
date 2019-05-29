// ======================================
// ========== Store plan ===============
// actions will run all real logic
// mutations will receive a payload and only set state
// use of getters to pull out properties from objects in state
// logic can be in the getters.
// ex... if(wallet and wallet.workers and wallet.workers.length>0), return workers else return ""
// that way... in the components, dont need any logic outside of checking if the getter returned
// potentially the getter will just check against a flag if used
// liking the flag idea actually quite a bit, potentially a nested flag
// wallet: {flag: (0,-1,1), ...}
// check will be against wallet.flag , not !wallet

// ======================================
// ========== Coin Plan ===============
// coins are much simpler
// just need a query for the summary list and a query for a detailed object
// query from the server, and then save data
// if a coin is not found in the detail search, set the coindetail to "error not found" and set coinstatus to -1?
// not sure if i should be setting things to "" or "erro" and then should i be using flags or not
// benefits of flags are being able to set the wallet/coindetail to "" and then running a check against the flag
// the flag can be cleared at the beginning of the code and then set to w.e
// i then run a computed property against the flag and can easily tell exists/not exists/not set
// woudl be nice to be able to search for a wallet and know if the wallet was not found or if i havent looked
// although that could easily be determined by the route? but mabye not, rather not have to check the route
// and reroute based on search results

// ======================================
// ========== Wallet Plan ===============
// first, a wallet needs to be queried from the api
// if it returns without error , save the account and add it to the wallets/localstorage, setl walletStats? =1
// if it returns with error, set the account to "error not found" and set walletStatus? = -1
// wallet will be saved as an account with a wallet object with a workers list nested (hopefully making it easier for when we implement accounts)
// although... we could probably do accounts similar to wallts is done.  local storage or flag somehow, will need to see DB setup
// workers might need a flag too
//

import Vue from 'vue';
import Vuex from 'vuex';
//import router from '../router/router';

import { COINS, COINDETAIL, WALLET } from '../graphql/queries';
import apollo from '../graphql/apolloClient';

Vue.use(Vuex);

export default new Vuex.Store({
  // status ->
  //  -1 not found
  //  0 not selected
  //  1 available
  //  2 loading/searching
  state: {
    coinsSummary: [],
    coinDetail: {},
    coinDetailStatus: 0,
    walletDetail: {},
    walletStatus: 0,
    walletsCache: [],
  },
  mutations: {
    saveCoins(state, payload) {
      // save list of coin data to state
      state.coinsSummary = payload.coinsSummary;
    },
    saveCoinDetail(state, payload) {
      // save details of one coin to state
      state.coinDetail = payload.coinDetail;
      state.coinDetailStatus = payload.coinDetailStatus;
    },

    saveWalletDetail(state, payload) {
      // save details of one coin to state
      // const wallet = payload.walletDetail;
      state.walletDetail = payload.wallet;
      state.walletStatus = payload.walletStatus;
    },
    updateWalletsCache(state, payload) {
      const wallets = payload.wallets;
      // save the wallets back to local storage and set the state
      localStorage.setItem('wallets', JSON.stringify(wallets));
      state.walletsCache = wallets;
    },
  },
  actions: {
    async fetchCoinsSummary({ commit, state }) {
      // fetches information on all of the coins
      const res = await apollo.query({
        query: COINS,
      });
      console.log(res.data.qCoins);
      // let coinsSummary = res.data.qCoins.slice(0);
      let coinsSummary = res.data.qCoins;

      commit('saveCoins', {
        coinsSummary: coinsSummary,
      });
    },
    async fetchCoinDetail({ commit, state }, payload) {
      let coinDetail = '';
      let coinDetailStatus = 0; // no wallet selected
      commit('saveCoinDetail', {
        coinDetail,
        coinDetailStatus, // no wallet selected
      });

      // if a coin is to be searched
      if (payload.coinDetail) {
        // update coin to searching
        coinDetailStatus = 2;
        commit('saveCoinDetail', {
          coinDetail,
          coinDetailStatus,
        });
        // get detail information including blocks from one coin
        console.log(payload.coinDetail);
        const res = await apollo.query({
          query: COINDETAIL,
          variables: { coinSymbol: payload.coinDetail },
        });

        // if the coin is found, set the coindetail to the new object
        // else set coindetailstatus to not found and clear the coin
        if (res.errors) {
          console.log(res.errors);
          //console.log('Coin Not Found');
          coinDetailStatus = -1;
        } else {
          [coinDetail] = res.data.qCoins;
          coinDetailStatus = 1;
        }
      }

      // regardles if coin found or not, save to coin detail
      commit('saveCoinDetail', {
        coinDetail,
        coinDetailStatus,
      });
    },
    async fetchWallet({ commit, state }, payload) {
      let wallet = '';
      let walletStatus = 0; // no wallet selected
      commit('saveWalletDetail', {
        wallet,
        walletStatus, // no wallet selected
      });

      // if a wallet is to be fetched ( it will be if we call fetch wallet)
      if (payload.wallet) {
        // update wallet to searching
        walletStatus = 2;
        commit('saveWalletDetail', {
          wallet,
          walletStatus,
        });

        // fetch wallet from backend
        const res = await apollo.query({
          query: WALLET,
          variables: { wallet: payload.wallet },
        });

        // if a wallet is found, set the wallet to the new object
        // else set walletstatus to not found and clear the wallet
        //console.log(res);
        if (res.errors) {
          //console.log('Wallet Not Found');
          walletStatus = -1;
        } else {
          wallet = res.data.qAccount[0];
          //console.log('inside the fetch', wallet);
          walletStatus = 1;
        }
      }

      // regardless if found or not, save the current wallet to state
      commit('saveWalletDetail', {
        wallet,
        walletStatus,
      });

      // update the wallets saved in state from the localstorage
      this.dispatch('addToWalletsCache', {
        wallet,
        walletStatus,
      });
      // commit('updateWalletsCache', {
      //   wallet: wallet,
      //   walletStatus: walletStatus
      // });
      //}
    },

    addToWalletsCache({ commit, state }, payload) {
      // check status to make sure a wallet was found

      // get current wallets from localstorage or initialize
      let wallets = JSON.parse(localStorage.getItem('wallets'));
      if (!wallets) {
        wallets = [];
      }

      if (payload.walletStatus == 1) {
        // check if wallet is already in the list, if not add it to the wallets array
        let wallet = payload.wallet;

        //console.log('inside the loop');
        // if (!wallet || wallet == 'Wallet not found') {
        //   console.log('wallet does not exist');
        // } else {
        if (wallets.indexOf(wallet.address) === -1) {
          wallets.push(wallet.address);
        }
        // wallets.indexOf(wallet.id) === -1
        //   ? wallets.push(wallet.id)
        //   : console.log('wallet exists');

        //console.log('inside', wallets);
        // }
      }
      //console.log('wallets', wallets);
      commit('updateWalletsCache', {
        wallets,
      });
    },
    removeFromWalletsCache({ commit, state }, payload) {
      // remove wallet from state and then local storage
      const wallet = payload.wallet;
      let wallets = JSON.parse(localStorage.getItem('wallets'));

      // // set wallets if none existed
      // if (!wallets) {
      //   wallets = [];
      // }
      let index = wallets.indexOf(wallet);
      if (index !== -1) {
        wallets.splice(index, 1);
      }

      commit('updateWalletsCache', {
        wallets,
      });
    },
  },
  getters: {
    coins(state) {
      return state.coinsSummary;
    },
    coinDetail(state) {
      return state.coinDetail;
    },
    wallet(state) {
      return state.walletDetail.id;
    },
    walletStatus(state) {
      return state.walletStatus;
    },
    wallets(state) {
      return state.walletsCache;
    },
    walletHashrate_24h(state) {
      const wallet = state.walletDetail;
      return wallet.hashrate_24h;
    },
    walletBalances(state) {
      const wallet = state.walletDetail.balances;
      const walletBalances = {
        unsold: wallet.total_unsold,
        balance: wallet.balance,
        unpaid: wallet.total_unpaid,
        paid24h: wallet.total_paid,
        total: wallet.total_earned,
      };
      return walletBalances;
    },
    walletEarnings(state) {
      const wallet = state.walletDetail;
      const walletEarnings = {
        ...wallet.earnings,
      };
      console.log('earnings', wallet.earnings);
      return wallet.earnings;
    },
    walletWorkers(state) {
      // if (state.walletDetail && state.walletDetail.workers) {
      //if(state.walletStatus ==1){
      return state.walletDetail.workers;
      //}
    },
  },
});
