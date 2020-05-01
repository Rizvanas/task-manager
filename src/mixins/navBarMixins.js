// import { mapActions } from 'vuex';

export default {
  computed: {
    user() {
      return this.$store.state.auth.authUser;
    },
  },
};
