<template>
  <div class="goal-invitation">
    <div class="level">
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
            @click="$emit('formClosed')"
            class="is-small is-pulled-right action-button--cancel"
          >
            <span class="icon">
              <i class="fas fa-times"></i>
            </span>
          </a>
        </div>
      </transition>
    </div>
    <div class="field">
      <p class="control has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Start entering goal title"
        />
      </p>
    </div>
    <perfect-scrollbar>
      <GoalInvitationItem />
      <GoalInvitationItem />
      <GoalInvitationItem />
    </perfect-scrollbar>
  </div>
</template>

<script>
import GoalInvitationItem from '@/components/GoalInvitationItem';

export default {
  name: 'GoalInvitationForm',

  components: {
    GoalInvitationItem,
  },

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
};
</script>

<style lang="scss" scoped>
.goal-invitation {
  margin: 4px 20px;
  padding: 8px 0.5em;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f6f9fc;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);

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
      background-color: #f8cdcd;
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
  max-height: 280px;
}
</style>
