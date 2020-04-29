<template>
  <router-link :to="{ name: 'GoalDetail', params: { id: goal['.key'] } }">
    <article class="box has-shadow-lift">
      <div class="is-pulled-right">{{ goal.ownerName }}</div>
      <div class="card-content">
        <div class="title has-text-weight-bold">{{ goal.title }}</div>
      </div>
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">7</p>
            <p class="heading">Days left</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ actionsLeft }}</p>
            <p class="heading">Actions left</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ goal.actionsFinished }}</p>
            <p class="heading">Actions finished</p>
          </div>
        </div>
      </div>
      <div class="card-footer-item">
        <progress class="progress is-small is-primary" value="21" max="100" />
      </div>
    </article>
  </router-link>
</template>

<script>
export default {
  name: 'GoalCard',

  props: {
    goal: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    disableEditMode() {
      this.editModeEnabled = false;
    },
  },
  computed: {
    actionsLeft() {
      return this.goal.totalActions - this.goal.actionsFinished;
    },
  },
};
</script>

<style scoped></style>
