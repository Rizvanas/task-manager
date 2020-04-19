<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item has-text-centered">
        <p class="title">{{ currentActionEmoji }}</p>
      </div>
    </div>
    <div class="level-item">
      <p class="action-text">{{ clonedAction.title }}</p>
    </div>
    <transition name="fade">
      <div class="level-right">
        <div class="level-item">
          <p
            @click="toggleStartPause"
            class="is-small is-pulled-right action-button"
          >
            <i v-if="clonedAction.isActive" class="fas fa-pause"></i>
            <i v-else class="fas fa-play"></i>
          </p>
        </div>
        <div class="level-item">
          <p
            @click="finishTask"
            v-if="clonedAction.isStarted"
            class="is-small is-pulled-right action-button"
          >
            <i class="fas fa-check"></i>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ActionMixins from '@/mixins/action-mixins';

export default {
  name: 'Action',
  props: {
    action: {
      type: Object,
      default: () => {
        return {
          title: '',
          expectedHours: 1,
          isStarted: false,
          isActive: false,
          isFinished: false,
        };
      },
    },
  },
  data() {
    return {
      clonedAction: { ...this.action },
    };
  },
  mixins: [ActionMixins],
  methods: {
    toggleStartPause() {
      if (!this.clonedAction.isStarted && !this.clonedAction.isFinished) {
        this.clonedAction.isStarted = true;
      }
      if (this.clonedAction.isStarted && !this.clonedAction.isFinished) {
        this.clonedAction.isActive = !this.clonedAction.isActive;
      }
      this.$emit('actionStateChange', this.clonedAction);
    },

    finishTask() {
      if (this.clonedAction.isStarted && !this.clonedAction.isFinished) {
        this.$emit('actionFinished', this.clonedAction._id);
      }
    },
  },
};
</script>

<style scoped>
.action-text {
  overflow: hidden;
  padding: 0 1rem 0 1rem;
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
