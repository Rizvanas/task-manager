import Vue from 'vue';
import Vuex from 'vuex';
import goals from './modules/goals';
import users from './modules/users';
import auth from './modules/auth';
import invites from './modules/invites';
import friends from './modules/friends';
import actions from './modules/actions';
import * as baseActions from './actions';
import * as mutations from './mutations';
import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  actions: baseActions,
  mutations: {
    ...mutations,
    ...vuexfireMutations,
  },
  modules: {
    goals,
    users,
    invites,
    friends,
    actions,
    auth,
  },
});
