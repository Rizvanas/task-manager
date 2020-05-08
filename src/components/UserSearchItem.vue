<template>
  <div class="level friend-item">
    <div class="level-left">
      <div class="level-item">
        <span class="profile-pic image is-32x32">
          <img class="is-rounded" :src="user.avatar" alt="User avatar" />
        </span>
        <p class="is-size-6">{{ user.username }}</p>
      </div>
      <br />
    </div>
    <transition name="fade">
      <div class="level-right is-size-7">
        <a
          class="is-small is-pulled-right action-button--submit"
          @click="invite"
        >
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserSearchItem',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions('invites', ['sendFriendInvitationTo']),

    invite() {
      this.sendFriendInvitationTo(this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
.friend-item {
  margin: 8px 20px;
  padding: 6px 0.5em;
  border-radius: 6px;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  background-color: #f6f9fc;
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);

  &:hover {
    background-color: #e6efff;
    .action-button {
      background-color: #bad8f5;
    }
  }

  .action-button {
    width: 32px;
    height: 32px;
    padding: 0.5em 0.75em;
    border-radius: 6px;
    margin-left: 0.5em;
    transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);
    position: relative;

    i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: block;
    }
    &:hover {
      i {
        color: #fff;
      }
    }

    &--submit {
      @extend .action-button;
      &:hover {
        background-color: #3273dc;
      }
    }
  }
}
.profile-pic {
  margin-right: 0.5em;
}
.ps {
  height: 420px;
}
</style>
