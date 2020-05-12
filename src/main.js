import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import router from './router';
import store from './store';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import VueMask from 'v-mask';
import Vuelidate from 'vuelidate';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';

Vue.use(VueMask);
Vue.use(Vuelidate);
Vue.use(PerfectScrollbar);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
