<template>
  <div>
    <div class="row">
      <div class="col-lg-6">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <h5 slot="header" class="card-title">This is where my chart will go</h5>
              <div class="table-responsive">
                <hashrate-chart></hashrate-chart>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="card">
              <h5 slot="header" class="card-title">Current Wallet</h5>
              <div class="table-responsive">
                <div class="currentWallet">
                  <div v-if="currentWallet">{{currentWallet}}</div>
                  <div v-else>No wallet selected or found</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="card">
              <h5 slot="header" class="card-title">Balances</h5>
              <div class="table-responsive">
                <balances></balances>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="card">
              <h5 slot="header" class="card-title">Earnings</h5>
              <div class="table-responsive">
                <earnings></earnings>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card">
          <h5 slot="header" class="card-title">Wallets List</h5>
          <div class="table-responsive">
            <wallets></wallets>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="card">
          <h5 slot="header" class="card-title">List of Workers</h5>
          <div class="table-responsive">
            <workers></workers>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Balances from "./Balances";
import Workers from "./Workers";
import Earnings from "./Earnings";
import Wallets from "./Wallets";
import HashrateChart from "./HashrateChart";
//import { COINS } from "../graphql/queries.js";

export default {
  components: {
    Balances: Balances,
    Workers: Workers,
    Wallets: Wallets,
    HashrateChart: HashrateChart,
    Earnings: Earnings
  },
  data() {
    return {};
  },
  props: ["wallet"],
  computed: {
    currentWallet() {
      const walletStatus = this.$store.state.walletStatus;
      switch (walletStatus) {
        case -1:
          return "Wallet Not Found";
        case 0:
          return "Please search for or select a wallet";
        case 1:
          return this.$store.getters.wallet;
        case 2:
          return "Loading Wallet";
      }
      // if (this.$store.state.walletStatus == 1) {
      //   //console.log(this.$store.getters.wallet);
      //   return this.$store.getters.wallet;
      // } else if (this.$)
    }
  },
  watch: {
    wallet: {
      immediate: true,
      handler() {
        this.dispatches();
        //this.timer = setInterval(this.dispatches, 60000);
      }
    }
  },
  methods: {
    dispatches: function() {
      this.$store.dispatch("fetchWallet", { wallet: this.wallet });
      console.log("refreshed");
    }
  }
};
</script>

<style lang="scss" scoped>
// .currentWallet {
//   padding: 2rem;
//   background-color: rgba(250, 123, 123, 0.5);
// }
</style>
