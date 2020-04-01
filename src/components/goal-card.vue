<template>
  <article class="box has-shadow-lift">
    <div class="card-content">
      <div class="title has-text-weight-bold">{{ clonedGoal.title }}</div>
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
          <p class="title">12</p>
          <p class="heading">Tasks left</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="title">9</p>
          <p class="heading">Tasks finished</p>
        </div>
      </div>
    </div>
    <div class="card-footer-item">
      <progress class="progress is-small is-success" value="21" max="100" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'GoalCard',
  data() {
    return {
      interval: false,
      timeElapsed: 2,
      editModeEnabled: false,
      clonedGoal: { ...this.goal },
    };
  },
  props: {
    goal: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    startCountDown() {
      if (!this.interval && this.timeElapsed !== 2) {
        this.interval = setInterval(() => this.timeElapsed++, 1000);
      }
      if (this.timeElapsed === 2) {
        this.editModeEnabled = true;
      }
    },
    stopCountDown() {
      clearInterval(this.interval);
      this.interval = false;
      this.timeElapsed = 0;
    },
    disableEditMode() {
      this.editModeEnabled = false;
    },
  },
};
</script>

<style scoped></style>
