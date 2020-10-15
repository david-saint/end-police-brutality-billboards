import Vue from 'vue';
import Vuex from 'vuex';

import twitter from './twitter';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    twitter,
  },
});
