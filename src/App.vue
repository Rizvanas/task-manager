<template>
  <div id="app">
    <NavBar />
    <NavBarTouch />
    <main class="main-section">
      <router-view :key="$route.path" v-show="showPage" @ready="setPageReady" />
      <AppSpinner v-show="!showPage" />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar';
import NavBarTouch from '@/components/nav-bar-touch';
import AppSpinner from '@/components/AppSpinner';

export default {
  name: 'App',
  components: { NavBar, NavBarTouch, AppSpinner },

  created() {
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false;
      next();
    });
  },

  data() {
    return {
      showPage: false,
    };
  },

  methods: {
    setPageReady() {
      this.showPage = true;
    },
  },
};
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
