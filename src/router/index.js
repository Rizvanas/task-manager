import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const parseProps = req => ({ id: parseInt(req.params.id) });

const routes = [
  {
    path: '/',
    redirect: '/goals',
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(
        /* webpackChunkName: "bundle.login-signup" */ '../views/login.vue'
      ),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () =>
      import(
        /* webpackChunkName: "bundle.login-signup" */ '../views/sign-up.vue'
      ),
  },
  {
    path: '/goals',
    name: 'Goals',
    component: () =>
      import(/* webpackChunkName: "bundle.goals" */ '../views/goals.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/about.vue'),
  },
  {
    path: '/goals/:id',
    name: 'goal-detail',
    props: parseProps,
    component: () =>
      import(/* webpackChunkName: "bundle.goals" */ '../views/goal-detail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
