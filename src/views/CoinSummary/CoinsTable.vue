<template>
  <div class="col-md-12">
    <div class="card-plain" body-classes="table-full-width">
      <!-- <template slot="header">
        <h4 class="card-title">Table on Plain Background</h4>
        <p class="category">Here is a subtitle for this table</p>
      </template>-->
      <div class="coins-summary__filters">
        <input class="coins-summary__filters--search" v-model="dataFilters.searchKey" type="search">
        <div class="coins-summary__filters--checkboxes" id="example-3">
          <input type="checkbox" id="AAA" value="AAA" v-model="dataFilters.checkboxes">
          <label for="AAA">AAA</label>
          <input type="checkbox" id="SPEC" value="SPEC" v-model="dataFilters.checkboxes">
          <label for="SPEC">Spec</label>
          <input type="checkbox" id="NEW" value="new" v-model="dataFilters.checkboxes">
          <label for="NEW">New</label>
        </div>
      </div>

      <div class="coins-summary">
        <table>
          <thead>
            <tr>
              <th id="icon-col"></th>
              <th
                v-for="col in columns"
                @click="sortBy(col.key)"
                :class="{ active: sortKey == col.key }"
                :key="col.key"
                class="sortable_column"
              >
                {{ col.title }}
                <i
                  v-if="col.key == sortKey"
                  :class="col.sortOrder ==='asc' ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                ></i>
              </th>
            </tr>
          </thead>
          <tbody is="transition-group" name="row-animate">
            <tr
              class="summary-row"
              v-for="row in filteredData"
              :key="row.symbol"
              @click="goToDetailCoin(row.symbol)"
            >
              <td class="img-container coins-summary__icon">
                <img
                  :src="`../img/coin_icons/coin-${row.symbol}.png`"
                  alt="icon"
                  onerror="this.src='../img/coin_icons/favicon.ico'"
                >
              </td>
              <!-- name -->
              <td class="coins-summary__name">
                {{row.name}} ({{row.symbol}})
                <br>
                <span v-if="row.new">New</span>
                {{row.notes}}
              </td>
              <!-- algo -->
              <td class="coins-summary__algo">{{row.algo}}</td>
              <!-- port -->
              <td class="coins-summary__port">{{row.port}}</td>
              <!-- hashrates -->
              <td class="coins-summary__hashrates">
                {{row.hashrate | hashformatter( row.algo)}}
                <br>
                {{row.network_hashrate | hashformatter( row.algo)}}
              </td>
              <!-- profit -->
              <td class="coins-summary__profit">{{row.profit}}</td>
              <!-- blocks_1d -->
              <!-- <td class="coins-summary__profit">{{row.block_data.blocks_1d}}</td> -->
              <td>{{row.relative_profit}}</td>
              <td>{{row.pool_luck}}</td>

              <td>
                <a :href="'#'">
                  <i class="fas fa-cogs"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import find from "lodash/find";
import filter from "lodash/filter";
import orderBy from "lodash/orderBy";

export default {
  components: {},
  data() {
    return {
      sortKey: "",
      firstSort: true,
      columns: [
        { title: "name", key: "name", sortOrder: "asc" },
        { title: "algo", key: "algo", sortOrder: "asc" },
        { title: "port", key: "port", sortOrder: "asc" },
        { title: "hashrate", key: "hashrate", sortOrder: "asc" },
        { title: "profit", key: "profit", sortOrder: "asc" },
        // { title: "blocks", key: "block_data.blocks_1d", sortOrder: "asc" },
        { title: "rel profit", key: "relative_profit", sortOrder: "asc" },
        { title: "luck", key: "pool_luck", sortOrder: "asc" }
      ],
      dataFilters: { searchKey: "", checkboxes: [] }
    };
  },

  computed: {
    coinsData() {
      return this.$store.getters.coins;
    },
    filteredData: function() {
      let sortKey = this.sortKey;
      let searchKey =
        this.dataFilters.searchKey && this.dataFilters.searchKey.toLowerCase();
      let checkboxes = this.dataFilters.checkboxes;
      let col = find(this.columns, { key: sortKey });
      let order = "asc";

      if (col) {
        order = col.sortOrder;
      }
      let data = this.coinsData;

      // filter data by searching all coin data for the search term
      if (searchKey) {
        data = data.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(searchKey) > -1
            );
          });
        });
      }

      // filter on checkbox filters
      if (checkboxes) {
        if (checkboxes.includes("new")) {
          data = filter(data, "new");
        }
      }

      // sort data by the sortkey for that row
      // if its the first sort, sort by new and then profit
      if (this.firstSort) {
        data = orderBy(data, ["new", "name"], ["desc", "asc"]);
      } else {
        console.log(sortKey);
        data = orderBy(data, sortKey, order);
      }

      return data;
    }
  },
  methods: {
    sortBy: function(key) {
      // loop through the columns and find the current column
      for (let col of this.columns) {
        if (col.key == key) {
          // check to see if we were already sorting on this key
          // if we were, toggle the current sort order
          // if not, reset to asc
          if (key === this.sortKey) {
            col.sortOrder = col.sortOrder === "asc" ? "desc" : "asc";
          } else {
            col.sortOrder = "asc";
          }
        }
      }

      // set new sortkey
      // clear first sort
      this.sortKey = key;
      this.firstSort = false;
    },

    goToDetailCoin: function(coin) {
      // clear the filter
      this.filterKey = "";
      // if (this.selectedCoin == coin.toUpperCase()) {
      //   this.$router.push({
      //     name: "Coins"
      //   });
      //   return;
      // }
      this.$router.push({
        name: "coinDetail",
        params: { coin: coin.toUpperCase() }
      });
    }
  }
};
</script>
<style scoped lang="scss">
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: searchfield-cancel-button;
}
.coins-summary {
  &__filters {
    display: flex;
    &--checkboxes {
      padding: 0 1rem;
    }
  }
  user-select: none;
  table {
    font-size: 0.8125rem;
    width: 100%;
    table-layout: auto;
    color: rgb(201, 201, 201);
  }

  th {
    text-transform: uppercase;
    cursor: pointer;
  }
  td {
    padding: 0.15rem 0.5rem;
    border-top: 1px rgba(255, 255, 255, 0.3) solid;
  }

  tr {
    height: 2.5rem;
  }

  &__icon {
    height: auto;
    width: 2.5rem;
    // padding-right: 2rem;
    // padding: 0.15rem 2rem;

    img {
      height: 20px;
      width: 20px;
    }
  }
}
.table-transparent {
  background-color: transparent !important;
}
tr {
  &:hover {
    color: white;
  }
  & > .sortable_column:hover {
    color: orangered;
  }
}
.summary-row {
  transition: all 0.25s;
  transition-timing-function: ease-in-out;
  //display: inline-block;
  //margin-right: 10px;
}
.row-animate-enter, .row-animate-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  //transform: translateY(30px);
}
.row-animate-leave-active {
  position: absolute;
}
</style>
