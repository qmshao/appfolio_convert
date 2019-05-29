<template>
  <div class="wallets">
    i am the holder of jacks wallets, past and present
    <ul class="walletList">
      <li class="walletList__item" v-for="wallet in wallets" :key="wallet">
        <div class="walletList__wallet" @click="routeToSearch(wallet)">{{wallet}}</div>&nbsp;-&nbsp;
        <div class="walletList__wallet-remove" @click="removeWallet(wallet)">X</div>
      </li>
    </ul>
    <form class="search-form" @submit.prevent="routeToSearch(searchWallet)">
      <input label="Wallet Search" required v-model="searchWallet" name="search wallet">
      <button native-type="submit" type="primary">Search for a Wallet</button>
      <!-- <input class="search-form__input" v-model="searchWallet" type="text"> -->
    </form>
  </div>
</template>

<script>
export default {
  //props: { wallet: "" },
  data() {
    return {
      searchWallet: ""
    };
  },
  methods: {
    routeToSearch(searchWallet) {
      this.$router.push({
        name: "wallet",
        params: { wallet: searchWallet }
      });
      this.searchWallet = "";
    },
    removeWallet(removeWallet) {
      this.$store.dispatch("removeFromWalletsCache", { wallet: removeWallet });
      //console.log(removeWallet);
    }
    // getError(fieldName) {
    //   return this.errors.first(fieldName);
    // }
  },
  watch: {
    // $route(to, from) {
    //   // when a route changes, fetch the new wallet
    //   this.$store.dispatch("fetchWallet", { wallet: this.wallet });
    // }
    // localStorage.wallets(){
    // }
  },
  computed: {
    // wallet: function() {
    //   // pull wallet from route
    //   if (this.$store.state.walletStatus == 1) {
    //     return this.$store.getters.wallet;
    //   }

    //   //return this.$route.params.wallet;
    // },
    // wallet: function() {
    //   if (this.$store.state.walletStatus == 1) {
    //     return this.$store.getters.wallet;
    //   }
    // },
    wallets: function() {
      return this.$store.getters.wallets;
    }
  }

  // mounted() {
  //   // when the page is mounted, fetch the wallet
  //   this.$store.dispatch("fetchWallet", { wallet: this.wallet });
  //   //}
  // }
};
</script>
<style lang="scss" scoped>
// .wallets {
//   padding: 2rem;
//   background-color: rgba(252, 187, 144, 0.5);
// }
// .search-form {
//   &__input {
//     width: 50rem;
//   }
// }

.walletList {
  &__item {
    display: flex;
    padding: 0.5rem 0;
    margin: 0.5rem;
    &:hover {
      color: red;
    }
  }

  &__wallet {
    cursor: pointer;

    &-remove {
      cursor: pointer;

      &:hover {
        font-weight: bold;
        color: blue;
      }
    }
  }
}
</style>
