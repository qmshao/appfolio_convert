<template>
  <div class="coin-detail-view">
    <zoom-center-transition :duration="300" mode="out-in">
      <div class="coin-detail" v-if="coinAvailable == 1" :key="1">
        <div class="basic-info">
          <div class="img-container basic-info__logo">
            <img :src="`../img/coin_icons/coin-${coinData.symbol}.png`" alt="icon">
          </div>
          <h3>{{ coinData.symbol }}</h3>
          <div>algo - {{ coinData.algo }}</div>
          <div>diff - {{ coinData.difficulty | diffFilter }}</div>
          <div>workers - {{ coinData.workers }}</div>
          <div>notes - {{ coinData.notes }}</div>
          <div>reward - {{ coinData.reward }}</div>
          <!-- <div>height - {{ coinData.block_data.height }}</div> -->
          <!-- <div>min ttf? - {{coinData.ttf}}</div> -->
          <div>price (sats) - {{coinData.price_sats}}</div>
          <div>exchange volume - {{coinData.exchange_volume}}</div>
          <div>network ttf - {{coinData.network_ttf | readableTimeDiff('absolute')}}</div>
          <div>pool ttf - {{coinData.pool_ttf | readableTimeDiff('absolute')}}</div>
          <div>confirmations - {{coinData.mature_blocks}}</div>
          <div>block time - {{coinData.block_time | readableTimeDiff('absolute')}}</div>

          <!-- <div>last found block height - {{coinData.block_data.lastblockheight}}</div> -->
          <!-- <div>time since found block - {{coinData.block_data.timesincelast}}</div> -->
          <!-- <div>blocks/1h - {{coinData.block_data.blocks_1h}}</div>
          <div>blocks/1d - {{coinData.block_data.blocks_1d}}</div>
          <div>blocks/7d - {{coinData.block_data.blocks_7d}}</div>
          <div>blocks/30d - {{coinData.block_data.blocks_30d}}</div>-->
        </div>
        <div class="link-list">
          <h5 v-if="coinData.link_site">
            <a v-bind:href="coinData.link_site">
              <i class="fas fa-home"></i> Website
            </a>
          </h5>
          <h5 v-if="coinData.exchange">
            <a v-bind:href="coinData.exchange">
              <i class="fas fa-exchange-alt"></i> Exchange
            </a>
          </h5>
          <h5 v-if="coinData.link_twitter">
            <a v-bind:href="coinData.link_twitter">
              <i class="fab fa-twitter"></i> Twitter
            </a>
          </h5>
          <h5 v-if="coinData.link_discord">
            <a v-bind:href="coinData.link_discord">
              <i class="fab fa-discord"></i> Discord
            </a>
          </h5>
          <h5 v-if="coinData.link_bitcointalk">
            <a v-bind:href="coinData.link_bitcointalk">
              <i class="fab fa-bitcoin"></i> Bitcoin Talk
            </a>
          </h5>
          <h5 v-if="coinData.link_github">
            <a v-bind:href="coinData.link_github">
              <i class="fab fa-github"></i> Github
            </a>
          </h5>
          <h5 v-if="coinData.link_telegram">
            <a v-bind:href="coinData.link_telegram">
              <i class="fab fa-telegram"></i> Telegram
            </a>
          </h5>
          <h5 v-if="coinData.link_explorer">
            <a v-bind:href="coinData.link_explorer">
              <i class="fas fa-th"></i> Block Explorer
            </a>
          </h5>
        </div>

        <table class="block-list">
          <tr>
            <th>Height</th>
            <th>Found</th>
            <th>Diff</th>
            <th>Effort</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
          <tr v-for="block in coinData.blocks" :key="block.height">
            <td>{{ block.height }}</td>
            <td>{{ block.time | readableTimeDiff('timeBlock') }}</td>
            <td>{{ block.difficulty | diffFilter }}</td>
            <td>10%</td>
            <td>{{block.amount}}</td>
            <td>
              <div
                class="badge block__category"
                :class="{'badge-warning': block.category=='immature', 'badge-success': block.category=='generate'}"
              >
                <div v-if="block.category=='generate'">Confirmed</div>
                <div class="block__unconfirmed" v-if="block.category!='generate'">
                  <div
                    class="block__unconfirmed--count"
                  >{{block.confirmations}}/{{coinData.mature_blocks}}&nbsp;&nbsp;~&nbsp;&nbsp;{{((coinData.mature_blocks - block.confirmations)*coinData.ttf) | readableTimeDiff('absolute') }}</div>
                  <!-- <div
                    class="block__unconfirmed--eta"
                  >~{{((coinData.mature_blocks - block.confirmations)*coinData.ttf) | readableTime('absolute') }}</div>-->
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div v-else :key="2">{{ coinAvailable }}</div>
    </zoom-center-transition>
  </div>
</template>

<script>
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    ZoomCenterTransition
  },
  computed: {
    coinAvailable() {
      const coinDetailStatus = this.$store.state.coinDetailStatus;
      console.log(coinDetailStatus);
      switch (coinDetailStatus) {
        case -1:
          return "Coin Not Found";
        case 0:
          return "Please select a coin";
        case 1:
          return 1;
        case 2:
          return "Loading Coin";
      }
    },
    coinData() {
      if (this.$store.state.coinDetailStatus == 1) {
        console.log(this.$store.getters.coinDetail);
        return this.$store.getters.coinDetail;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.blocksList {
  color: white !important;
}
.block-list {
  //width: 100%;
  color: white;
  table {
    table-layout: auto;
  }
  td {
    padding: 0.25rem 0.5rem;
    border-top: 1px rgba(255, 255, 255, 0.3) solid;

    // border-width: 1px 0;
    // border-color: #000;
    // border-style: solid;
  }
}
.block__category {
  width: 6rem;
  //text-align: left;
}
.block__unconfirmed {
  display: flex;
  justify-content: space-around;
  //align-items:
  text-align: center;
  text-transform: lowercase;

  &--eta {
    text-align: center;
    //margin-right: 0.5rem;
  }
}

.basic-info {
  &__logo {
    width: 5rem;
  }
}

// .coin-detail-view {
//   //padding: 2rem;
//   min-width: 30vw;
//   //display: flex;
// }
// .coin-detail {
//   padding: 2rem;
//   width: 100%;
//   display: flex;
//   justify-content: space-around;

//   background-color: #fff;
//   box-shadow: $box-shadow;
// }

// .block-list {
//   font-size: 1rem;
//   list-style: none;
// }
</style>
