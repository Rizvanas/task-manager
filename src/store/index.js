import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = () => ({
  projects: [],
  tasks: [],
  user: {},
});

const mutations = {};
const actions = {};
const getters = {};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
