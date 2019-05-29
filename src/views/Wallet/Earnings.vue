<template>
  <div class="earnings">
    I'm jacks earnings
    <br>
    <br>
    <div v-if="earningsData && earningsData.length > 0">
      <div class="table-earnings">
        <table>
          <thead>
            <tr>
              <th>create_time</th>
              <th>amount</th>
              <th>price</th>
              <th>status</th>
              <th>mature_time</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in earningsData" :key="row.id">
              <td>{{row.create_time | readableTimeDiff('timeBlock')}} ago</td>
              <td>{{Math.round(row.amount *1e6)/1e6}}</td>
              <td>{{Math.round(row.price *1e8)/1e5}}</td>
              <td>{{row.status}}</td>
              <td>{{row.mature_time}}</td>
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
    earningsData() {
      // Watch the store, when coins list is populated, and a coin route is selected, get a fresh coin
      if (this.$store.state.walletStatus == 1) {
        // if(this.$store.state.wallet==='loading'){
        //   return 'loading'
        // }
        return this.$store.getters.walletEarnings;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table-earnings {
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
    height: 1rem;
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
