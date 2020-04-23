<template>
  <div v-if="!showInvitationForm" class="level friend-item">
    <div class="level-left">
      <div class="level-item">
        <span class="profile-pic image is-32x32">
          <img class="is-rounded" :src="friend.avatar" alt="Friend avatar" />
        </span>
      </div>
      <div class="level-item">
        <p class="is-size-6">{{ friend.username }}</p>
      </div>
      <br />
    </div>
    <transition name="fade">
      <div class="level-right is-size-7">
        <a
          @click="showInvitationForm = true"
          class="is-small is-pulled-right action-button--submit"
        >
          <span class="icon">
            <i class="fas fa-project-diagram"></i>
          </span>
        </a>
        <a class="is-small is-pulled-right action-button--cancel">
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
        </a>
      </div>
    </transition>
  </div>
  <GoalInvitationForm
    v-else
    :friend="friend"
    @formClosed="showInvitationForm = false"
  />
</template>

<script>
import GoalInvitationForm from '@/components/GoalInvitationForm';

export default {
  name: 'FriendListItem',

  components: { GoalInvitationForm },

  props: {
    friend: {
      type: Object,
      default: () => {
        return {
          username: 'Rizvanas',
          avatar: 'https://bulma.io/images/placeholders/96x96.png',
        };
      },
    },
  },

  data() {
    return {
      showInvitationForm: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.friend-item {
  margin: 8px 20px;
  padding: 6px 0.5em;
  border-radius: 6px;
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);

  &:hover {
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    background-color: #f6f9fc;

    .action-button {
      background-color: #cde3f8;
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

    &--cancel {
      @extend .action-button;
      &:hover {
        background-color: #d33e5d;
      }
    }
  }
}
.profile-pic {
  margin-right: 1em;
}
.ps {
  height: 420px;
}
</style>
