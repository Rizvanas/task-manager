<template>
  <router-link :to="{ name: 'GoalDetail', params: { id: goal['.key'] } }">
    <article class="box has-shadow-lift">
      <div class="is-pulled-right">{{ goal.ownerName }}</div>
      <div class="card-content">
        <div class="title has-text-weight-bold">{{ goal.title }}</div>
      </div>
      <br />
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">
              {{ goal.timeRequired | urgencyEmoji(completionDate) }}
            </p>
            <p class="is-size-7 has-text-weight-bold">Urgency</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ actionsLeft }}</p>
            <p class="is-size-7 has-text-weight-bold">Actions left</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ goal.actionsFinished }}</p>
            <p class="is-size-7 has-text-weight-bold">Actions Finished</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">7</p>
            <p class="is-size-7 has-text-weight-bold">Days left</p>
          </div>
        </div>
      </div>
      <div class="card-footer-item">
        <progress
          class="progress is-small is-primary"
          :value="goal.timeFinished"
          :max="goal.timeRequired"
        />
      </div>
    </article>
  </router-link>
</template>

<script>
import emojiStatus from '@/mixins/emojiStatus';

export default {
  name: 'GoalCard',

  props: {
    goal: {
      type: Object,
      default: () => {},
    },
  },

  mixins: [emojiStatus],

  methods: {
    disableEditMode() {
      this.editModeEnabled = false;
    },
  },

  computed: {
    actionsLeft() {
      return this.goal.totalActions - this.goal.actionsFinished;
    },

    completionDate() {
      return this.goal.completionDate.toDate();
    },
  },
};
</script>

<style scoped></style>
