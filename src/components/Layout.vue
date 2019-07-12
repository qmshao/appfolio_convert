<template>
  <v-app id="layout">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-toolbar flat>
        <v-list>
          <!-- <v-list-tile>
            <v-list-tile-title class="title">Application</v-list-tile-title>
          </v-list-tile>-->
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Appfolio Owner Statement Conversion Tool</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; Copyright Mark And Min</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data: function() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "dashboard", path: "/" },
        { title: "About", icon: "question_answer", path: "/about" }
      ],
      right: null
    };
  }
};
</script>

