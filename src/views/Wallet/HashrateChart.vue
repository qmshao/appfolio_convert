<template>
  <div class="chart">
    i'm jacks hashrate data
    <div v-if="hashrateData.length > 0">
      <!-- <div class="col-md-12 ml-auto"> -->
      <highcharts :options="chartOptions"></highcharts>
      <!-- </div> -->
    </div>
    <div v-else>No chart available</div>
  </div>
</template>

<script>
//import LineChart from "src/components/Charts/LineChart";
//import config from "@/config";
//import * as chartConfigs from '@/components/Charts/config';
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
export default {
  components: {
    highcharts: Chart
  },
  data() {
    return {};
  },
  computed: {
    //
    chartOptions() {
      return {
        chart: {
          type: "spline"
        },
        title: {
          text: "Sin chart"
        },
        xAxis: {
          labels: {
            formatter: function() {
              return new Date(this.value).toTimeString().split(" ")[0];
            }
            // x: 3
          }
        },
        series: [
          {
            data: this.chartData, // sample data,
            color: "#6fcd98",
            name: "Wallet Hashrate "
          },
          {
            data: this.chartData2, // sample data,
            color: "#000",
            name: "Series 2 "
          }
        ]
      };
    },

    hashrateData() {
      // watch store for valid wallet status
      let hashrateData = [];
      if (this.$store.state.walletStatus == 1) {
        hashrateData = this.$store.getters.walletHashrate_24h;
      }
      if (hashrateData.length > 0) {
        return hashrateData;
      }
      return [];
    },
    chartData() {
      let tableData = [];
      if (this.hashrateData.length > 0) {
        for (let dataPoint of this.hashrateData) {
          tableData.push([dataPoint.timestamp, dataPoint.hashrate]);
        }
      }
      return tableData;
    },
    chartData2() {
      let tableData = [];
      if (this.hashrateData.length > 0) {
        for (let dataPoint of this.hashrateData) {
          tableData.push([dataPoint.timestamp, dataPoint.hashrate / 2]);
        }
      }
      return tableData;
    }
  }
};
</script>

<style lang="scss" scoped>
// .chart {
//   padding: 2rem;
//   background-color: rgba(164, 166, 255, 0.5);
// }
</style>

