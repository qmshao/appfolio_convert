import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './routes/router';
import store from './store/store';
import './util/filters';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
