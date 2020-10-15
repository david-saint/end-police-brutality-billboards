import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'end-sars-twitter',
    component: () => import(/* webpackChunkName: 'home' */ '../views/Home.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
