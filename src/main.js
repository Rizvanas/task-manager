import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './app.vue';
import router from './router';
import store from './store';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';

Vue.use(PerfectScrollbar);

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content',
});

Vue.directive('click-outside', {
  bind() {
    this.event = event => this.vm.$emit(this.expression, event);
    this.el.addEventListener('click', this.stopProp);
    document.body.addEventListener('click', this.event);
  },
  unbind() {
    this.el.removeEventListener('click', this.stopProp);
    document.body.removeEventListener('click', this.event);
  },

  stopProp(event) {
    event.stopPropagation();
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
