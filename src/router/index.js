import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/goals',
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requiresGuest: true },
    component: () =>
      import(
        /* webpackChunkName: "bundle.login-signup" */ '../views/LoginPage.vue'
      ),
  },
  {
    path: '/signup',
    name: 'SignUp',
    meta: { requiresGuest: true },
    component: () =>
      import(
        /* webpackChunkName: "bundle.login-signup" */ '../views/SignUpPage.vue'
      ),
  },
  {
    path: '/logout',
    name: 'SignOut',
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      store.dispatch('auth/signOut');
      next({ name: 'Login' });
    },
  },
  {
    path: '/goals',
    name: 'Goals',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "bundle.goals" */ '../views/GoalsPage.vue'),
  },
  {
    path: '/goals/:id',
    name: 'GoalDetail',
    props: true,
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "bundle.goals" */ '../views/GoalDetailPage.vue'
      ),
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "bundle.profile" */ '../views/ProfilePage.vue'
      ),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch('auth/initAuthentication').then(user => {
    if (to.meta.requiresAuth) {
      user ? next() : next({ name: 'Login', query: { redirectTo: to.path } });
    } else if (to.meta.requiresGuest) {
      !user ? next() : next({ name: 'Goals' });
    } else {
      next();
    }
  });
});

export default router;
