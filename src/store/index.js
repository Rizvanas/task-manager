import Vue from 'vue';
import Vuex from 'vuex';
import goals from './modules/goals';
import users from './modules/users';
import auth from './modules/auth';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  actions,
  mutations,
  modules: {
    goals,
    users,
    auth,
  },
});
