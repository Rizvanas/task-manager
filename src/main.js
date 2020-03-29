import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBullseye,
  faInfo,
  faSignOutAlt,
  faCheckSquare,
  faFire,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import router from './router';
import store from './store';

library.add(faBullseye, faInfo, faSignOutAlt, faCheckSquare, faFire, faSearch);

Vue.component('font-awesome-icon', FontAwesomeIcon);
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
