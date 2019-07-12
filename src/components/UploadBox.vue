<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app>
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-file-added="vfileAdded"
        :useCustomSlot="true"
        @vdropzone-success-multiple="vfileSuccessful"
        @vdropzone-removed-file="vfileRemoved"
      >
        <div class="dropzone-custom-content">
          <h3>Drag and Drop Appfolio Owner Statements!</h3>
          <h5>...or click to select a file from your computer</h5>
        </div>
        <div v-if="objTxs.length>0" class="txs">
          <v-btn color="error" @click="removeAll">Remove removeAll</v-btn>

          <v-expansion-panel>
            <v-expansion-panel-content
              class="property_table"
              v-for="(prop,idx) in objTxs"
              :key="idx"
              :pagination.sync="pagination"
            >
              <template v-slot:header>
                <v-toolbar-title class="text-sm-left">
                  Property: {{prop.property}}
                  <br />
                  Period: {{prop.period}}
                  <v-btn color="info" @click="downloadCSV(prop)">Download CSV</v-btn>
                </v-toolbar-title>
              </template>
              <v-card>
                <v-data-table :headers="headers" :items="prop.txs">
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
            </v-expansion-panel-content>
          </v-expansion-panel>
        </div>
      </vue-dropzone>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Appfolio Owner Statement Conversion Tool</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div v-if="objTxs.length>0" class="txs">
        <v-btn color="error" @click="removeAll">Remove removeAll</v-btn>

        <v-expansion-panel>
          <v-expansion-panel-content
            class="property_table"
            v-for="(prop,idx) in objTxs"
            :key="idx"
            :pagination.sync="pagination"
          >
            <template v-slot:header>
              <v-toolbar-title class="text-sm-left">
                Property: {{prop.property}}
                <br />
                Period: {{prop.period}}
                <v-btn color="info" @click="downloadCSV(prop)">Download CSV</v-btn>
              </v-toolbar-title>
            </template>
            <v-card>
              <v-data-table :headers="headers" :items="prop.txs">
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; Copyright Mark And Min</span>
    </v-footer>
  </v-app>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { parser } from "../util/parse";
export default {
  name: "app",
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 1,
        clickable: false,
        headers: { "My-Awesome-Header": "header value" },
        // maxFiles: 2,
        uploadMultiple: true,
        // addRemoveLinks: true,
        createImageThumbnails: false
      },
      objTxs: [],
      pagination: {
        rowsPerPage: 10
      },
      drawer: null,
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
    },
    removeAll() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.objTxs = [];
    },
    vfileAdded(file) {},

    async vfileSuccessful(files, response) {
      console.log("success", files);
      for (let file of files) {
        if (file.type == "application/pdf") {
          let property = await parser(file);
          this.objTxs.push(...property);
        }
      }
      this.$refs.myVueDropzone.removeAllFiles();

      // this.objTxs = await parser(file);
    },
    vfileRemoved(file, error, xhr) {}
  }
};
</script>

<style lang="scss" >
</style>


