<template>
  <div class="balances">I'm jacks balances
    <br>
    <br>
    <div v-if="balanceData">
      Unsold - {{balanceData.unsold}}
      <br>
      Balance - {{balanceData.balance}}
      <br>
      Unpaid - {{balanceData.unpaid}}
      <br>
      Paid 24 hours - {{balanceData.paid24h}}
      <br>
      Total Paid- {{balanceData.total}}
    </div>
    <div v-else>No balance data availabe</div>
  </div>
</template>

<script>
export default {
  computed: {
    balanceData() {
      // Watch the store, when coins list is populated, and a coin route is selected, get a fresh coin
      if (this.$store.state.walletStatus == 1) {
        return this.$store.getters.walletBalances;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .balances {
//   padding: 2rem;
//   background-color: rgba(247, 239, 126, 0.5);
// }
</style>

