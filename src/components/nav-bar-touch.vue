<template>
  <nav v-if="user" class="navbar is-hidden-desktop is-fixed-top">
    <div class="navbar-brand level">
      <div class="navbar-item level-left is-size-4">
        <router-link class="level-item" to="/goals">
          <span
            class="navbar-title navbar-item"
            aria-label="Home page"
            data-balloon-pos="bottom"
            >Goalse</span
          >
        </router-link>
      </div>
      <a
        role="button"
        class="navbar-burger level-right"
        data-target="navMenu"
        aria-label="menu"
        aria-expanded="false"
        @click="isActive = !isActive"
        :class="{ 'is-active': isActive }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" id="navMenu" :class="{ 'is-active': isActive }">
      <div class="navbar-item">
        <router-link to="/goals" class="navbar-item">
          <span>Goals</span>
        </router-link>
        <router-link to="about" class="navbar-item">
          <span>About</span>
        </router-link>
        <router-link to="/logout" class="navbar-item">
          <span class="icon">
            <i class="fas fa-sign-out-alt"></i>
          </span>
          <span>Sign out</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import navBarMixins from '@/mixins/navBarMixins';

export default {
  name: 'NavBarTouch',

  data() {
    return {
      isActive: false,
    };
  },

  mixins: [navBarMixins],
};
</script>
