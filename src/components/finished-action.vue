<template>
  <div>
    <div class="level">
      <div class="level-item has-text-centered">
        <p class="has-text-weight-bold">{{ action.title }}</p>
      </div>
    </div>
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="has-text-weight-bold is-size-7">Status</p>
          <p class="status-tag--success has-text-white">Finished</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="has-text-weight-bold is-size-7">Expected</p>
          <p class="status-tag action-text">{{ action.timeExpected }} h</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="has-text-weight-bold is-size-7">Took</p>
          <p class="status-tag action-text">{{ action.timeTaken }} h</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="has-text-weight-bold is-size-7">Rating</p>
          <p class="status-tag action-text">
            {{ action.timeExpected | hoursEmoji }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emojiStatus from '@/mixins/emojiStatus';

export default {
  name: 'FinishedAction',

  props: {
    action: {
      type: Object,
      default: () => {
        return {
          title: '',
          timeExpected: 0,
        };
      },
    },
  },

  mixins: [emojiStatus],
};
</script>
