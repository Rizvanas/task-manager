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
          @active-change="changeActiveStatus"
        >
          <a role="button" slot="trigger" class="edit-icon">
            <i class="fas fa-user-plus"></i>
          </a>
          <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
            <div class="modal-card" style="width:400px;">
              <UserSearchDropdown :active="isActive" />
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <p class="is-size-5 has-text-weight-bold tile-title">Friends</p>
    <perfect-scrollbar :options="options">
      <ul class="menu menu-list">
        <li v-for="friend in friends" :key="friend.id">
          <FriendListItem :friend="friend" />
        </li>
      </ul>
    </perfect-scrollbar>
  </div>
</template>

<script>
import FriendListItem from '@/components/FriendListItem';
import UserSearchDropdown from '@/components/UserSearchDropdown';

export default {
  name: 'FriendList',

  components: {
    FriendListItem,
    UserSearchDropdown,
  },

  data() {
    return {
      showInvitationForm: false,
      isActive: false,
      options: { wheelPropagation: false },
    };
  },

  computed: {
    friends() {
      return this.$store.state.friends.items;
    },
  },

  methods: {
    changeActiveStatus(status) {
      this.isActive = status;
    },
  },
};
</script>

<style lang="scss" scoped></style>
