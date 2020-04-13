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
    <div class="level-right" tabindex="-1">
      <div class="level-item">
        <p
          @click="toggleStartPause"
          class="is-small is-pulled-right action-button"
        >
          <i v-if="clonedAction.isPaused" class="fas fa-pause"></i>
          <i v-else class="fas fa-play"></i>
        </p>
      </div>
      <div class="level-item">
        <p
          v-if="clonedAction.isStarted"
          class="is-small is-pulled-right action-button"
        >
          <i class="fas fa-check"></i>
        </p>
      </div>
    </div>
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
          isPaused: true,
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
      if (!this.clonedAction.isStarted) {
        this.clonedAction.isStarted = true;
      }
      if (this.clonedAction.isStarted) {
        this.clonedAction.isPaused = !this.clonedAction.isPaused;
      }
      this.$emit('actionStateChange', this.clonedAction);
    },
  },
};
</script>

<style scoped>
.action-text {
  overflow: hidden;
  padding: 0 1rem 0 1rem;
}
</style>
