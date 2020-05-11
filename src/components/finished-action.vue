<template>
  <div>
    <div class="has-text-centered">
      <p class="has-text-weight-bold">{{ action.title }}</p>
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
          <p class="status-tag action-text">{{ expectedFinishTime }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="has-text-weight-bold is-size-7">Took</p>
          <p class="status-tag action-text">{{ actualFinishTime }}</p>
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
import { getTimeDurationInDisplayFormat } from '@/shared/dateHelpers';
export default {
  name: 'FinishedAction',

  props: {
    action: {
      type: Object,
      required: true,
    },
  },

  mixins: [emojiStatus],

  computed: {
    expectedFinishTime() {
      return getTimeDurationInDisplayFormat(this.action.timeExpected);
    },

    actualFinishTime() {
      return getTimeDurationInDisplayFormat(this.action.timeTaken);
    },
  },
};
</script>
