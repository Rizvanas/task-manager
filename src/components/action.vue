<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <span class="profile-pic image is-32x32">
            <img
              class="is-rounded"
              :src="assignedUser.avatar"
              alt="Friend
          avatar"
            />
          </span>
          <div>
            <span></span>
            <p class="action-text is-size-6 has-text-weight-bold">
              {{ clonedAction.title }}
              {{ clonedAction.timeExpected | hoursEmoji }}
            </p>
            <p class="action-text is-size-7 has-text-weight-light">
              In progress: {{ timeSpent }}
            </p>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div class="level-right is-size-7">
          <div class="level-item">
            <p
              @click="toggleActivation"
              class="is-small is-pulled-right action-button"
            >
              <span class="icon is-small">
                <i v-if="clonedAction.isActive" class="fas fa-pause"></i>
                <i v-else class="fas fa-play"></i>
              </span>
            </p>
          </div>
          <div v-if="clonedAction.isActive" class="level-item">
            <p
              @click="finishTask"
              class="is-small is-pulled-right action-button"
            >
              <span class="icon is-small">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import emojiStatus from '@/mixins/emojiStatus';
import { mapActions } from 'vuex';

export default {
  name: 'Action',
  props: {
    action: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      // clonedAction: { ...this.action },
    };
  },

  mixins: [emojiStatus],

  methods: {
    ...mapActions('actions', ['updateAction']),

    toggleActivation() {
      if (!this.clonedAction.isFinished) {
        this.clonedAction.isActive = !this.clonedAction.isActive;
        this.update();
      }
    },

    finishTask() {
      if (this.isStarted && !this.clonedAction.isFinished) {
        this.clonedAction.isFinished = true;
        this.update();
      }
    },

    update() {
      this.updateAction({
        id: this.clonedAction['.key'],
        goalId: this.clonedAction.goalId,
        updatedAction: this.clonedAction,
      });
      this.$emit('actionStateChange', this.clonedAction);
    },
  },

  computed: {
    isStarted() {
      return this.clonedAction.lastActivationTime !== undefined;
    },

    assignedUser() {
      return this.$store.state.users.items[this.clonedAction.assignedUserId];
    },

    clonedAction() {
      return { ...this.action };
    },

    timeSpent() {
      const seconds = this.clonedAction.timeTaken;
      const hours = Math.trunc(seconds / 3600);
      const minutes = Math.trunc((seconds % 3600) / 60);
      return hours === 0
        ? `${minutes} minutes`
        : `${hours}hours ${minutes}minutes`;
    },
  },
};
</script>

<style scoped>
.action-text {
  overflow: hidden;
  padding: 0 0.75rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 50ms ease-in-out;
}
.fade-enter,
.fade-leave-to {
  display: none;
  opacity: 0;
}
</style>
