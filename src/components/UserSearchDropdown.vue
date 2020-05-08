<template>
  <div>
    <p class="has-text-weight-bold has-text-centered is-size-6 dropdown-title">
      Invite
    </p>
    <ul>
      <li v-for="user in users" :key="user.id">
        <UserSearchItem :user="user" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import UserSearchItem from '@/components/UserSearchItem';

export default {
  name: 'UserSearchDropdown',

  components: {
    UserSearchItem,
  },

  props: ['active'],

  data() {
    return {
      alreadyFetched: false,
      username: null,
    };
  },

  methods: {
    ...mapActions('users', ['fetchNonFriendUsers']),

    async getUsers() {
      if (!this.alreadyFetched) {
        await this.fetchNonFriendUsers();
        this.alreadyFetched = true;
      }
    },
  },

  computed: {
    users() {
      return Object.values(this.$store.state.users.nonFriends);
    },
  },

  watch: {
    active: {
      immediate: true,
      handler(val, oldVal) {
        if (!oldVal && val) {
          this.getUsers();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-title {
  margin: 0 0 1em 0;
}

.ps {
  height: 320px;
}

.is-horizontal-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
