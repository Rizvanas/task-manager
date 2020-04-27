<template>
  <b-dropdown
    position="is-bottom-right"
    append-to-body
    aria-role="menu"
    trap-focus
  >
    <button role="button" slot="trigger" class="button button-special">
      <span class="profile-pic image is-24x24">
        <img class="is-rounded" :src="assignedUser.avatar" alt="User avatar" />
      </span>
      <span class="is-hidden-touch">{{ assignedUser.username }}</span>
    </button>
    <b-dropdown-item
      v-for="user in users"
      :key="user['.key']"
      aria-role="menu-item"
      :focusable="false"
      @click="assignNewUser(user['.key'])"
      custom
      class="has-text-justified"
    >
      <button
        v-if="user['.key'] !== assignedUserId"
        class="button button-special"
      >
        <span class="profile-pic image is-24x24">
          <img class="is-rounded" :src="user.avatar" alt="User avatar" />
        </span>
        <span>{{ user.username }}</span>
      </button>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'UserSelectionList',

  props: {
    users: {
      type: Array,
      required: true,
    },

    assignedUserId: {
      type: String,
      default: null,
    },
  },

  computed: {
    authId() {
      return this.$store.state.auth.authId;
    },

    assignedUser() {
      const userId = this.assignedUserId ? this.assignedUserId : this.authId;
      return this.$store.state.users.items[userId];
    },
  },

  methods: {
    assignNewUser(id) {
      this.$emit('newUserAssigned', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tile-title {
  margin: 0 0 1em 1em;
}

.profile-pic {
  margin-right: 0.5em;
}

.ps {
  height: 420px;
}
</style>
