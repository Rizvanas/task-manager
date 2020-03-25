<template>
  <div
    class="login-body login-container"
    id="container"
    v-bind:class="{ 'right-panel-active': !loginSelected }"
  >
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>Create Account</h1>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>Sign in to take charge of your projects</p>
          <button class="ghost" id="signIn" @click="toggleLogin">
            Sign In
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, busy person!</h1>
          <p>Start managing you projects now!</p>
          <button class="ghost" id="signUp" @click="toggleLogin">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginSignup',
  data() {
    return {
      loginSelected: true,
    };
  },
  methods: {
    toggleLogin() {
      this.loginSelected = !this.loginSelected;
    },

    handleSignIn() {},
  },
};
</script>
