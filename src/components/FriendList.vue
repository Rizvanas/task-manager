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
          <a
            role="button"
            slot="trigger"
            @mouseenter="hovered = true"
            @mouseleave="hovered = false"
            class="edit-icon"
          >
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
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
        <FriendListItem />
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
      hovered: false,
      showInvitationForm: false,
      options: { wheelPropagation: false },
    };
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
