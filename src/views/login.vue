<template>
  <form class="container" method="post" @submit.prevent="handleLogin">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" type="text" placeholder="Username" />
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="Email" />
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="Password" />
      </div>
    </div>
    <button class="button is-primary">Sign in</button>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {};
  },
  methods: {
    handleLogin() {},
  },
};
</script>
