<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="(prop,idx) in propertyData" :key="idx">
        <!-- <v-icon color="primary">save_alt</v-icon> -->

        <template v-slot:header>
          Property: {{prop.property}} -
          Period: {{prop.period}}
          <v-btn color="success">Success</v-btn>
          <v-icon color="primary">save_alt</v-icon>
        </template>
        <v-card>
          <property :property="prop"></property>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
import property from "@/components/Property";
export default {
  props: ["propertyData"],
  components: {
    property
  },
  data: () => {
    return {
      pagination: {
        rowsPerPage: 10
      }
    };
  },
  methods: {
    convertArrayOfObjectsToCSV(args) {
      var result, ctr, keys, columnDelimiter, lineDelimiter, data;

      data = args.data || null;
      if (data == null || !data.length) {
        return null;
      }

      columnDelimiter = args.columnDelimiter || ",";
      lineDelimiter = args.lineDelimiter || "\n";

      keys = Object.keys(data[0]);

      result = "";
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];
          ctr++;
        });
        result += lineDelimiter;
      });

      return result;
    },
    downloadCSV(property) {
      var data, filename, link;
      var csv = this.convertArrayOfObjectsToCSV({
        data: property.txs
      });
      if (csv == null) return;

      filename = `${property.property}.csv` || "export.csv";

      if (!csv.match(/^data:text\/csv/i)) {
        csv = "data:text/csv;charset=utf-8," + csv;
      }
      data = encodeURI(csv);

      link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", filename);
      link.click();
    }
  }
};
</script>
<style lang="scss" scoped>
.v-expansion-panel__header__icon {
  margin-left: auto;
}
.v-btn {
  margin-left: auto;
  width: 2rem;
}
</style>
