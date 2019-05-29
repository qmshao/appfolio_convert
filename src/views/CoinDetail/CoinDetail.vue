<template>
  <div class="row">
    <!-- <div class="col-lg-8">
      <card class="card">
        <h5 slot="header" class="card-title">Summary Of Coins</h5>
        <div class="table-responsive">
          <coins-summary></coins-summary>
        </div>
      </card>
    </div>-->

    <div class="col-lg-4">
      <!-- <card class="card" :header-classes="{ 'text-right': isRTL }"> -->
      <div class="card">
        <h5 slot="header" class="card-title">Detail Info</h5>
        <div class="table-responsive">
          <coin-data></coin-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CoinsSummary from './CoinsSummary';
import CoinData from "./Data";

export default {
  components: {
    // CoinsSummary,
    CoinData
  },
  computed: {
    // coin() {
    //   console.log(this.$route.params.coin);
    //   return this.$route.params.coin;
    // }
  },
  props: ["coin"],
  // watch: {
  //   coin: {
  //     immediate: true,
  //     handler() {
  //       this.dispatches();
  //       //this.timer = setInterval(this.dispatches, 60000);
  //     }
  //   }
  // },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    dispatches: function() {
      //console.log('coin', this.coin);
      //this.$store.dispatch('fetchCoinsSummary');
      this.$store.dispatch("fetchCoinDetail", { coinDetail: this.coin });
      console.log("refreshed");
    }
  },
  mounted() {
    // this.$store.dispatch("fetchCoinsSummary");
    console.log(this.coin);
    this.$store.dispatch("fetchCoinDetail", { coinDetail: this.coin });

    // this.i18n = this.$i18n;
    // console.log('rtl', this.$route.query.enableRTL);
    // if (this.enableRTL) {
    //   this.i18n.locale = 'ar';
    //   this.$rtl.enableRTL();
    // }
    // //this.initBigChart(0);
  }

  // beforeDestroy() {
  //   if (this.$rtl.isRTL) {
  //     this.i18n.locale = 'en';
  //     this.$rtl.disableRTL();
  //   }
  // }
};
</script>
<style lang="scss"></style>
