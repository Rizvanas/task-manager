<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-tablet is-5-desktop is-4-widescreen">
            <form class="box" method="post" @submit.prevent="handleSignUp">
              <h3 class="title has-text-centered has-text-weight-bold">
                Hi! ✋
              </h3>
              <a @click="signUpWithGoogle" class="button is-fullwidth">
                <span class="google-button__icon">
                  <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                      id="Shape"
                      fill="#EA4335"
                    />

                    <path
                      d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                      id="Shape"
                      fill="#FBBC05"
                    />
                    <path
                      d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                      id="Shape"
                      fill="#4285F4"
                    />
                    <path
                      d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                      fill="#34A853"
                    />
                  </svg>
                </span>
                <span class="google-button__text">Continue with Google</span>
              </a>
              <div class="is-divider" data-content="or"></div>
              <a
                class="button is-fullwidth is-primary is-outlined"
                @click="toggleSignUpMode"
                >Sign up using your email</a
              >
              <div v-if="isEmailSignUp">
                <br />
                <h3 class="title has-text-centered has-text-weight-bold">
                  Lets get started 😉
                </h3>
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input
                      v-model.lazy="form.username"
                      type="text"
                      placeholder="Username"
                      autofocus="autofocus"
                      class="input"
                      :class="{ 'is-danger': $v.form.username.$error }"
                      @blur="$v.form.username.$touch()"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-signature"></i>
                    </span>
                    <span
                      v-if="$v.form.username.$error"
                      class="icon is-small is-right has-text-danger"
                    >
                      <i class="fas fa-exclamation-circle"></i>
                    </span>
                  </div>
                  <template v-if="$v.form.username.$error">
                    <p v-if="!$v.form.username.required" class="help is-danger">
                      Username is required
                    </p>
                    <p
                      v-else-if="!$v.form.username.minLength"
                      class="help is-danger"
                    >
                      Username must be at least 4 characters long
                    </p>
                    <p
                      v-else-if="!$v.form.username.unique"
                      class="help is-danger"
                    >
                      This username is already taken
                    </p>
                  </template>
                </div>
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input
                      v-model.lazy="form.email"
                      type="email"
                      placeholder="Email"
                      class="input"
                      :class="{ 'is-danger': $v.form.email.$error }"
                      @blur="$v.form.email.$touch()"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <span
                      v-if="$v.form.email.$error"
                      class="icon is-small is-right has-text-danger"
                    >
                      <i class="fas fa-exclamation-circle"></i>
                    </span>
                  </div>
                  <template v-if="$v.form.email.$error">
                    <p v-if="!$v.form.email.required" class="help is-danger">
                      Email is required
                    </p>
                    <p v-else-if="!$v.form.email.email" class="help is-danger">
                      Email address must be valid
                    </p>
                    <p v-else-if="!$v.form.email.unique" class="help is-danger">
                      This email address is already taken
                    </p>
                  </template>
                </div>
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input
                      v-model="form.password"
                      type="password"
                      placeholder="Password"
                      autocomplete="off"
                      class="input"
                      :class="{ 'is-danger': $v.form.password.$error }"
                      @blur="$v.form.password.$touch()"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-key"></i>
                    </span>
                    <span
                      v-if="$v.form.password.$error"
                      class="icon is-small is-right has-text-danger"
                    >
                      <i class="fas fa-exclamation-circle"></i>
                    </span>
                  </div>
                  <template v-if="$v.form.password.$error">
                    <p v-if="!$v.form.password.required" class="help is-danger">
                      Password is required
                    </p>
                    <p
                      v-else-if="!$v.form.password.minLength"
                      class="help is-danger"
                    >
                      Password must be at least 6 characters long
                    </p>
                  </template>
                </div>
                <button type="submit" class="button is-fullwidth is-primary">
                  Sign up!
                </button>
              </div>
              <hr />
              <p class="subtitle is-size-6 has-text-centered">
                Already have an account?
                <router-link to="/login" class="has-text-link"
                  >Log in</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { uniqueUsername, uniqueEmail } from '@/shared/validators';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'SignUpPage',
  data() {
    0;
    return {
      isEmailSignUp: false,
      form: {
        email: null,
        username: null,
        password: null,
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
        unique: uniqueEmail,
      },
      username: {
        required,
        minLength: minLength(4),
        unique: uniqueUsername,
      },
      password: { required, minLength: minLength(6) },
    },
  },
  methods: {
    ...mapActions('auth', ['signUpWithEmailAndPassword', 'signInWithGoogle']),

    handleSignUp() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      if (this.isEmailSignUp) {
        this.signUpWithEmail();
      } else {
        this.signUpWithGoogle();
      }
    },

    toggleSignUpMode() {
      this.isEmailSignUp = !this.isEmailSignUp;
    },

    async signUpWithEmail() {
      await this.signUpWithEmailAndPassword(this.form);
      this.$router.push('/');
    },

    async signUpWithGoogle() {
      await this.signInWithGoogle();
      this.$router.push('/');
    },
  },

  created() {
    this.$emit('ready');
  },
};
</script>
