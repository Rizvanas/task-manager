<template>
  <div id="app">
    <div v-if="user">
      <NavBar @createGoal="displayGoalForm = true" />
      <NavBarTouch />
    </div>
    <main class="main-section">
      <transition name="zoom">
        <GoalForm v-if="displayGoalForm" @close="displayGoalForm = false" />
      </transition>
      <router-view :key="$route.path" v-show="showPage" @ready="setPageReady" />
      <AppSpinner v-show="!showPage" />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar';
import NavBarTouch from '@/components/nav-bar-touch';
import AppSpinner from '@/components/AppSpinner';
import GoalForm from '@/components/GoalForm';

export default {
  name: 'App',
  components: { NavBar, NavBarTouch, AppSpinner, GoalForm },

  data() {
    return {
      showPage: false,
      displayGoalForm: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.authUser;
    },
  },

  methods: {
    setPageReady() {
      this.showPage = true;
    },
  },

  created() {
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false;
      next();
    });
  },
};
</script>

<style lang="scss">
@import '@/design/index.scss';

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.1s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>
