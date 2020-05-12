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
            <p class="action-text is-size-6 has-text-weight-bold">
              {{ clonedAction.title }}
              {{ clonedAction.timeExpected | hoursEmoji }}
            </p>
            <p
              v-if="isStarted"
              class="action-text is-size-7 has-text-weight-light"
            >
              {{ actionSub }}
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
  name: 'ActionItem',
  props: {
    action: {
      type: Object,
      required: true,
    },
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

    async update() {
      await this.updateAction({
        id: this.clonedAction.id,
        updatedAction: this.clonedAction,
      });
      this.$emit('actionStateChange', this.clonedAction);
    },
  },

  computed: {
    isStarted() {
      return this.action.lastActivationTime !== undefined;
    },

    assignedUser() {
      const userId = this.clonedAction.assignedUserId;
      return this.$store.state.users.items.find(user => user.id === userId);
    },

    clonedAction() {
      return { ...this.action, id: this.action.id };
    },

    actionSub() {
      const subtitle = this.action.isActive ? 'In progress ' : 'Paused: ';
      return `${subtitle} ${this.timeSpent}`;
    },

    timeSpent() {
      const seconds = this.clonedAction.timeTaken;
      const hours = Math.trunc(seconds / 3600);
      const minutes = Math.trunc((seconds % 3600) / 60);
      return hours === 0 ? `${minutes} m` : `${hours}h ${minutes}m`;
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
