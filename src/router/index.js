import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/projects',
  },
  {
    path: '/login-signup',
    name: 'LoginSignup',
    component: () =>
      import(
        /*webpackChunkName: "bundle.login-signup"*/ '../views/login-signup.vue'
      ),
  },
  {
    path: '/projects',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "bundle.projects" */ '../views/home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/about.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
