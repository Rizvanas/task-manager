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
      :key="user.id"
      aria-role="menu-item"
      :focusable="false"
      custom
      class="has-text-justified"
    >
      <button
        @click="assignNewUser(user.id)"
        v-if="user.id !== userId"
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

  data() {
    return {
      userId: this.assignedUserId ? this.assignedUserId : this.authId,
    };
  },

  computed: {
    authId() {
      return this.$store.state.auth.authId;
    },

    assignedUser() {
      return this.$store.state.users.items.find(
        user => user.id === this.userId,
      );
    },
  },

  methods: {
    assignNewUser(id) {
      this.userId = id;
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
