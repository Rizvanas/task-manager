<template>
  <nav
    class="navbar is-transparent is-fixed-top is-spaced is-hidden-touch"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand is-size-3">
      <router-link to="/goals" class="navbar-item">
        <span class="navbar-title">Goalse</span>
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/goals" class="navbar-item">
          <span>Goals</span>
        </router-link>
        <router-link to="/about" class="navbar-item">
          <span>About</span>
        </router-link>
        <div class="control has-icons-right">
          <input
            class="input is-rounded"
            type="text"
            placeholder="Search goals..."
          />
          <span class="icon is-small is-right">
            <font-awesome-icon :icon="['fas', 'search']" />
          </span>
        </div>
      </div>
      <div class="navbar-end">
        <router-link to="/login" class="navbar-item">
          <span class="icon">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          </span>
          <span>Sign out</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
