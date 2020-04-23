<template>
  <nav
    v-if="user"
    class="navbar is-transparent is-fixed-top is-spaced is-hidden-touch"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand is-size-3">
      <router-link to="/goals" class="navbar-item">
        <span class="navbar-title">Goalona</span>
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

        <div class="navbar-item">
          <button class="button button-special">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
            <span>Set new goal</span>
          </button>
        </div>
      </div>
      <div class="navbar-end">
        <div calss="navbar-item">
          <b-dropdown
            position="is-bottom-left"
            append-to-body
            aria-role="menu"
            trap-focus
          >
            <button
              @click="fetchInvites"
              role="button"
              slot="trigger"
              class="button button-special"
            >
              <span class="icon is-small">
                <i class="fas fa-user-friends"></i>
              </span>
            </button>
            <b-dropdown-item aria-role="menu-item" :focusable="false" custom>
              <div class="modal-card" style="width:350px;">
                <ReceivedInvitesList
                  @accepted="acceptTest"
                  :invites="invites"
                  :isReady="invitesFetched"
                />
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="navbar-item">
          <b-dropdown
            position="is-bottom-left"
            append-to-body
            aria-role="menu"
            trap-focus
          >
            <button role="button" slot="trigger" class="button button-special">
              <span class="profile-pic image is-24x24">
                <img class="is-rounded" :src="user.avatar" alt="User avatar" />
              </span>
              <span>{{ user.username }}</span>
            </button>
            <b-dropdown-item
              class="action"
              has-link
              aria-role="menuitem"
              :focusable="false"
              custom
            >
              <router-link to="/profile">
                <span class="icon has-text-right">
                  <i class="fas fa-user-alt"></i>
                </span>
                <span>Profile</span>
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item
              class="action"
              has-link
              aria-role="menuitem"
              :focusable="false"
              custom
            >
              <router-link to="/logout">
                <span class="icon has-text-right">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Sign out</span>
              </router-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import navBarMixins from '@/mixins/navBarMixins';
import ReceivedInvitesList from '@/components/ReceivedInvitesList';
import { mapActions } from 'vuex';

export default {
  name: 'NavBar',
  components: {
    ReceivedInvitesList,
  },
  mixins: [navBarMixins],

  data() {
    return {
      invitesFetched: false,
    };
  },

  computed: {
    invites() {
      return Object.values(this.$store.state.invites.received);
    },
  },

  methods: {
    ...mapActions('invites', [
      'fetchReceivedInvitations',
      'acceptFriendInvite',
    ]),
    async fetchInvites() {
      if (!this.invitesFetched) {
        await this.fetchReceivedInvitations(this.user['.key']);
      }
      this.invitesFetched = true;
    },

    acceptTest(id) {
      this.acceptFriendInvite(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-pic {
  margin-right: 0.5em;
}

.invites-button {
  padding: 0.5em 0.75em;
  border-radius: 6px;
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 7px 25px 0;
  i {
    color: #363636;
  }
  &:hover {
    background-color: rgba(50, 115, 220, 0.01);
    box-shadow: 0px 4px 8px rgba(50, 115, 220, 0.4);
    i {
      color: #3273dc;
    }
  }
}
</style>
