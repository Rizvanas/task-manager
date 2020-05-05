<template>
  <router-link :to="{ name: 'GoalDetail', params: { id: goal.id } }">
    <article class="box has-shadow-lift">
      <div class="is-pulled-right is-marginless">
        <span class="profile-pic image is-32x32">
          <img class="is-rounded" :src="goal.ownerAvatar" alt="User avatar" />
        </span>
      </div>
      <div class="card-content">
        <div class="title has-text-weight-bold">{{ goal.title }}</div>
      </div>
      <br />
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">
              {{
                goal.timeRequired
                  | urgencyEmoji(goal.timeFinished, completionDate)
              }}
            </p>
            <p class="is-size-7 has-text-weight-bold">Urgency</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ actionsLeft }}</p>
            <p class="is-size-7 has-text-weight-bold">
              {{ actionsLeftHeading }}
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ actionsFinished }}</p>
            <p class="is-size-7 has-text-weight-bold">
              {{ actionsFinishedHeading }}
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ daysLeft }}</p>
            <p class="is-size-7 has-text-weight-bold">{{ daysLeftHeading }}</p>
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
import dateMixins from '@/mixins/dateMixins';
import goalMixins from '@/mixins/goalMixins';

export default {
  name: 'GoalCard',

  props: {
    goal: {
      type: Object,
      required: true,
    },
  },

  mixins: [emojiStatus, dateMixins, goalMixins],

  methods: {
    disableEditMode() {
      this.editModeEnabled = false;
    },

    getPlurifiedText(itemCount, itemName) {
      return itemCount === 1 ? itemName : `${itemName}s`;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-pic {
  margin-right: 0.5em;
}
</style>
