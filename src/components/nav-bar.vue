<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/projects" class="nav-link">
          <font-awesome-icon :icon="['fas', 'clipboard-list']" size="4x" />
          <span class="link-text">Projects</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link">
          <font-awesome-icon :icon="['fas', 'info-circle']" size="4x" />
          <span class="link-text">About</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
