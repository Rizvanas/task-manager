<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title is-size-4 is-paddingless">
            {{ clonedAction.timeExpected | hoursEmoji }}
          </p>
          <div>
            <p class="action-text is-size-6 has-text-weight-bold">
              {{ clonedAction.title }}
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
  name: 'UserActionItem',

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
      return this.clonedAction.lastActivationTime !== undefined;
    },

    clonedAction() {
      return { ...this.action, id: this.action.id };
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
