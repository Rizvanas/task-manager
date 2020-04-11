<template>
  <div>
    <div class="level">
      <div class="level-item has-text-centered">
        <p class="title">{{ currentActionEmoji }}</p>
        <p class="action-text">{{ clonedAction.title }}</p>
      </div>
    </div>
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading has-text-weight-bold">Expected</p>
          <p class="action-text">8 h</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading has-text-weight-bold">Taken</p>
          <p class="action-text">8.9 h</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading has-text-weight-bold">Rating</p>
          <p class="action-text">💪</p>
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
