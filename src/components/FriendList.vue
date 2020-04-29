<template>
  <div>
    <div class="level is-marginless">
      <div class="level-item level-right">
        <b-dropdown
          class="edit-button"
          position="is-bottom-left"
          append-to-body
          aria-role="menu"
          trap-focus
        >
          <a role="button" slot="trigger" class="edit-icon">
            <i class="fas fa-user-plus"></i>
          </a>
          <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
            <div class="modal-card" style="width:400px;">
              <UserSearchDropdown />
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <p class="is-size-5 has-text-weight-bold tile-title">Friends</p>
    <perfect-scrollbar :options="options">
      <ul class="menu menu-list">
        <li v-for="friend in friends" :key="friend['.key']">
          <FriendListItem :friend="friend" />
        </li>
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script>
import FriendListItem from '@/components/FriendListItem';
import UserSearchDropdown from '@/components/UserSearchDropdown';
import { mapActions } from 'vuex';

export default {
  name: 'FriendList',

  components: {
    FriendListItem,
    UserSearchDropdown,
  },

  data() {
    return {
      showInvitationForm: false,
      options: { wheelPropagation: false },
    };
  },

  computed: {
    authId() {
      return this.$store.state.auth.authId;
    },

    friends() {
      return this.$store.state.friends.items;
    },
  },

  methods: {
    ...mapActions('friends', ['fetchUserFriends']),
  },

  created() {
    this.fetchUserFriends(this.authId);
  },
};
</script>

<style lang="scss" scoped>
.tile-title {
  margin: 0 0 1em 1em;
}

.ps {
  height: 420px;
}
</style>
