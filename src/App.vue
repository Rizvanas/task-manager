<template>
  <div id="app">
    <div>
      <!-- <NavBar /> -->
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
// import NavBar from '@/components/nav-bar';

export default {
  name: 'App',
  // components: { NavBar },
};
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
