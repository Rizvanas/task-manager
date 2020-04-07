<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="tile is-ancestor">
        <div class="tile is-7 is-vertical">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child box has-shadow-border">
              <div class="card-content">
                <p class="title">{{ goal.title }}</p>
                <hr />
                <p class="subtitle">{{ goal.description }}</p>
              </div>
              <br />
              <div class="level">
                <div class="level-item has-text-centered">
                  <div class="action">
                    <p class="title">🧊</p>
                    <p class="heading">Urgency</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div class="action">
                    <p class="title">9</p>
                    <p class="heading">Tasks finished</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div class="action">
                    <p class="title">7</p>
                    <p class="heading">Days left</p>
                  </div>
                </div>
              </div>
              <div>
                <progress
                  class="progress is-small is-primary"
                  value="21"
                  max="100"
                />
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box has-shadow-border">
              <div class="has-text-centered">
                <p class="subtitle has-text-weight-bold">Activity</p>
              </div>
              <ActivityChart :height="200" />
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box has-shadow-border">
            <span>
              <a
                @mouseenter="hovered = true"
                @mouseleave="hovered = false"
                @click="setEditMode"
                class="is-small is-pulled-right edit-button"
              >
                <i class="fas fa-pen"></i>
              </a>
            </span>
            <br />
            <p class="subtitle has-text-weight-bold has-text-centered">
              Actions
            </p>
            <ul class="menu menu-list">
              <li v-for="action in goal.actions" :key="action.id">
                <a class="action" :class="{ 'is-edited': editMode }">
                  <Action :action="action" :isInEditMode="editMode" />
                </a>
              </li>
            </ul>
            <div v-if="editMode" class="buttons is-centered">
              <button class="button is-primary is-rounded">
                <span class="icon is-small">
                  <i class="fas fa-save"></i>
                </span>
                <span>Save</span>
              </button>
              <button
                @click="turnOffEditMode"
                class="button is-danger is-rounded is-outlined"
              >
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Action from '@/components/action';
import ActivityChart from '@/components/activity-chart';

export default {
  name: 'GoalDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ActivityChart,
    Action,
  },
  data() {
    return {
      goal: {},
      hovered: false,
      editMode: false,
    };
  },
  created() {
    this.goal = {
      title: 'Read another shitty book',
      description:
        'Read a shitty self help book to get inspired for a meme app',
      actions: [
        { id: 1, title: 'Random Task #1', workHours: 5 },
        { id: 2, title: 'Generic Task #2', workHours: 3 },
        { id: 3, title: 'Shitty Task #3', workHours: 10 },
        { id: 4, title: 'Gay Task #4', workHours: 6 },
        { id: 5, title: 'Meh Task #5', workHours: 7 },
        { id: 6, title: 'Funny Task #6', workHours: 6 },
        { id: 7, title: 'Scary task #7', workHours: 8 },
      ],
    };
  },

  methods: {
    toggleHover() {
      this.hover = !this.hover;
    },

    setEditMode() {
      if (!this.editMode) {
        this.editMode = true;
      }
    },
    turnOffEditMode() {
      if (this.editMode) {
        this.editMode = false;
      }
    },
  },
};
</script>

<style scoped>
.actions-container {
  height: 30vh;
}
</style>
