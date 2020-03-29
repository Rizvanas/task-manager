<template>
  <div id="app">
    <NavBar />
    <NavBarTouch />
    <main class="main-section">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar';
import NavBarTouch from '@/components/nav-bar-touch';

export default {
  name: 'App',
  components: { NavBar, NavBarTouch },
};
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
