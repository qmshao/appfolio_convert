<template>
  <div class="workers">
    I'm jacks workers
    <br>
    <br>
    <div v-if="workerData && workerData.length > 0">
      <div class="table-workers">
        <table>
          <thead>
            <tr>
              <th>Worker</th>
              <th>Version</th>
              <th>Extra</th>
              <th>Algo</th>
              <th>Pass</th>
              <th>Diff</th>
              <th>ES</th>
              <th>Hash</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in workerData" :key="row.id">
              <td>{{row.worker}}</td>
              <td>{{row.version}}</td>
              <td>{{row.extra}}</td>
              <td>{{row.algo}}</td>
              <td>{{row.password}}</td>
              <td>{{row.difficulty}}</td>
              <td>{{row.es}}</td>
              <td>{{row.hashrate | hashformatter(row.algo)}}</td>
              <td>{{row.reject}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>Workers Not Found</div>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    workerData() {
      // Watch the store, when coins list is populated, and a coin route is selected, get a fresh coin
      if (this.$store.state.walletStatus == 1) {
        // if(this.$store.state.wallet==='loading'){
        //   return 'loading'
        // }
        //console.log(this.$store.getters.walletWorkers);
        return this.$store.getters.walletWorkers;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table-workers {
  user-select: none;

  table {
    width: 100%;
    table-layout: auto;
    color: rgb(201, 201, 201);
  }
  th {
    text-transform: uppercase;
  }
  td {
    padding: 0.25rem 0.5rem;
    border-top: 1px rgba(255, 255, 255, 0.3) solid;
  }

  tr {
    height: 4rem;
  }
}
// .workers {
//   padding: 2rem;
//   background-color: rgba(174, 235, 174, 0.5);
// }

// .workers__list {
//   &--item {
//     padding-bottom: 0.5rem;
//   }
//   // list-style: none;
// }
</style>
