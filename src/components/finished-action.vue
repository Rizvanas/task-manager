<template>
  <div>
    <div class="level">
      <div class="level-item has-text-centered">
        <p class="action-text has-text-weight-bold">{{ clonedAction.title }}</p>
      </div>
    </div>
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading has-text-weight-bold">Status</p>
          <p class="status-tag--success">Finished</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading has-text-weight-bold">Expected</p>
          <p class="status-tag action-text">{{ action.expectedHours }} h</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading has-text-weight-bold">Took</p>
          <p class="status-tag action-text">{{ action.totalHours }} h</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading has-text-weight-bold">Rating</p>
          <p class="status-tag action-text">{{ currentActionEmoji }}</p>
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
          expectedHours: 0,
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
