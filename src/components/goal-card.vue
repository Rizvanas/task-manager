<template>
  <article class="box has-shadow-lift">
    <div class="one-line-items is-marginless">
      <span class="is-size-5 is-right">🔥 7 days left</span>
    </div>
    <div class="card-content">
      <div class="title has-text-weight-bold">{{ clonedGoal.title }}</div>
      <hr />
      <p class="subtitle">
        I'm baby copper mug quinoa tofu bitters, four loko pitchfork kickstarter
        cloud bread authentic artisan retro.
      </p>
    </div>
    <div class="card-content">
      <h3 class="subtitle has-text-weight-bold">Next acomplishment</h3>
      <div class="level is-marginless">
        <div class="level-left is-size-5">🦄</div>
        <div class="field">
          <div class="control">
            <div class="b-checkbox is-warning">
              <input id="checkbox" class="styled" checked type="checkbox" />
              <label for="checkbox">
                Is Warning
              </label>
            </div>
          </div>
        </div>
      </div>
      <button aria-label="Whats up!" data-balloon-pos="down">
        Hover me!
      </button>
    </div>
    <div class="card-footer-item">
      <progress class="progress is-success" value="21" max="100" />
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
