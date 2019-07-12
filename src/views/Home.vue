<template>
  <vue-dropzone
    ref="myVueDropzone"
    id="dropzone"
    class="dropzone"
    :options="dropzoneOptions"
    @vdropzone-file-added="vfileAdded"
    :useCustomSlot="true"
    @vdropzone-success-multiple="vfileSuccessful"
    @vdropzone-removed-file="vfileRemoved"
  >
    <properties v-if="propertyData.length > 0" :propertyData="propertyData"></properties>
  </vue-dropzone>
</template>

<script>
// @ is an alias to /src
// import UploadBox from "@/components/UploadBox.vue";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import properties from "@/components/Properties";
import { parser } from "../util/parse";
export default {
  name: "home",
  components: {
    vueDropzone: vue2Dropzone,
    properties
  },

  data: function() {
    return {
      propertyData: [],

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
      }
    };
  },
  methods: {
    removeAll() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.propertyData = [];
    },
    vfileAdded(file) {},

    async vfileSuccessful(files, response) {
      console.log("success", files);
      for (let file of files) {
        if (file.type == "application/pdf") {
          let property = await parser(file);
          this.propertyData.push(...property);
        }
      }
      this.$refs.myVueDropzone.removeAllFiles();
    },
    vfileRemoved(file, error, xhr) {}
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
}
.dropzone {
  height: 100%;
  width: 100%;
}
</style>

