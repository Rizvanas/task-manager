<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <p class="title">{{ currentActionEmoji }}</p>
        </div>
      </div>
      <transition name="fade">
        <div class="level-item">
          <p class="action-text">{{ clonedAction.title }}</p>
        </div>
      </transition>
      <div class="level-right" tabindex="-1">
        <div class="level-item">
          <p>Uzbaigimo statistika</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionMixins from '@/mixins/action-mixins';

export default {
  name: 'FinishedAction',

  props: {
    action: {
      type: Object,
      default: () => {
        return {
          title: '',
          workHours: 0,
        };
      },
    },
  },

  mixins: [ActionMixins],

  data() {
    return {
      clonedAction: { ...this.action },
    };
  },
};
</script>
