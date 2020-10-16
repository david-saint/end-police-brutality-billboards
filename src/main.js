import Vue from 'vue';
import VueTypedJs from 'vue-typed-js';

import store from './store';
import router from './router';

import App from './App.vue';
import '@/assets/scss/main.scss';

Vue.use(VueTypedJs);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
