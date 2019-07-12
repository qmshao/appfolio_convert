<template>
  <div>
    <v-card>
      <v-data-table :headers="headers" :items="property.txs">
        <template v-slot:items="props">
          <td>{{props.item.date}}</td>
          <td>{{props.item.payee}}</td>
          <td>{{props.item.type}}</td>
          <td>{{props.item.ref}}</td>
          <td>{{props.item.desc}}</td>
          <td>{{props.item.income}}</td>
          <td>{{props.item.expense}}</td>
          <td>{{props.item.balance}}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["property"],
  data: () => {
    return {
      headers: [
        { text: "Date", value: "date" },
        { text: "Payee", value: "payee" },
        { text: "Type", value: "type" },
        { text: "Ref", value: "ref" },
        { text: "Description", value: "desc" },
        { text: "Income", value: "income" },
        { text: "Expense", value: "expense" },
        { text: "Balance", value: "balance" }
      ]
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

