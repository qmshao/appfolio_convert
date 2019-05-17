<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="card">
        <h5 slot="header" class="card-title">Summary Of Coins</h5>
        <div class="table-responsive">
          <coins-table></coins-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoinsTable from "./CoinsTable";
// import CoinDetail from "./CoinDetail";

export default {
  components: {
    CoinsTable
    //CoinDetail
  },
  props: ["coin"],
  watch: {
    coin: {
      immediate: true,
      handler() {
        this.dispatches();
        //this.timer = setInterval(this.dispatches, 60000);
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    dispatches: function() {
      //console.log('coin', this.coin);
      //this.$store.dispatch('fetchCoinsSummary');
      //this.$store.dispatch("fetchCoinDetail", { coinDetail: this.coin });
      //console.log("refreshed");
    }
  },
  mounted() {
    this.$store.dispatch("fetchCoinsSummary");

    // this.i18n = this.$i18n;
    // console.log('rtl', this.$route.query.enableRTL);
    // if (this.enableRTL) {
    //   this.i18n.locale = 'ar';
    //   this.$rtl.enableRTL();
    // }
    // //this.initBigChart(0);
  }
  // computed: {
  //   enableRTL() {
  //     return this.$route.query.enableRTL;
  //   },
  //   isRTL() {
  //     return this.$rtl.isRTL;
  //   }
  // },

  // beforeDestroy() {
  //   if (this.$rtl.isRTL) {
  //     this.i18n.locale = 'en';
  //     this.$rtl.disableRTL();
  //   }
  // }
};
</script>
<style lang="scss"></style>
