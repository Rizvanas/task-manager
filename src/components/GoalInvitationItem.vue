<template>
  <div class="level goal-invitation-item">
    <div class="level-left">
      <div class="level-item">
        <p class="is-size-6">{{ invitation.title }}</p>
      </div>
      <br />
    </div>
    <transition name="fade">
      <div class="level-right is-size-7">
        <a
          @click="addToGoal"
          class="is-small is-pulled-right action-button--submit"
        >
          <span class="icon">
            <i class="fas fa-share"></i>
          </span>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'GoalInvitationItem',

  props: {
    invitation: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    goalId() {
      return this.invitation['.key'];
    },
  },

  methods: {
    ...mapActions('goals', ['updateGoal']),
    ...mapActions('invites', ['removeInvite']),

    addToGoal() {
      let goal = cloneDeep(this.$store.state.goals.items[this.goalId]);
      goal.members.push(this.invitation.to);
      this.updateGoal({ id: this.goalId, updatedGoal: goal });
      this.removeInvite({ resource: 'goal', id: this.invitation['.key'] });
    },
  },
};
</script>

<style lang="scss" scoped>
.goal-invitation-item {
  margin: 14px 20px;
  padding: 5px 0.5em;
  border-radius: 6px;
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  background-color: #fff;

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
      background-color: #cde3f8;
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
