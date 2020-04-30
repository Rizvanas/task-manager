<template>
  <section v-if="asyncDataStatus_ready" class="section">
    <div class="tile is-ancestor">
      <div class="tile is-7 is-vertical is-fullheight">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child box has-shadow-border">
            <div class="one-line-form" v-if="editTitle">
              <div class="field">
                <div class="control">
                  <input
                    v-model="goal.title"
                    class="title is-size-5 input is-fullwidth"
                    type="text"
                    placeholder="Name your goal"
                  />
                </div>
              </div>
              <div class="field is-pulled-right">
                <div class="control">
                  <a
                    @click="updateTitle"
                    class="is-small action-button--submit"
                  >
                    <i class="fas fa-check"></i>
                  </a>
                  <a
                    @click="editTitle = false"
                    class="is-small action-button--cancel"
                  >
                    <i class="fas fa-times"></i>
                  </a>
                </div>
              </div>
            </div>
            <a v-else>
              <p
                @click="editTitle = true"
                class="title is-size-5 clickable-form"
              >
                {{ goal.title }}
              </p>
            </a>
            <div class="one-line-form" v-if="editDescription">
              <div class="field">
                <div class="control">
                  <input
                    v-model="goal.description"
                    class="subtitle is-size-6 input"
                    type="text"
                    placeholder="Describe your goal"
                  />
                </div>
              </div>
              <div class="field is-pulled-right">
                <div class="control">
                  <a
                    @click="updateDescription"
                    class="is-small action-button--submit"
                  >
                    <i class="fas fa-check"></i>
                  </a>
                  <a
                    @click="editDescription = false"
                    class="is-small action-button--cancel"
                  >
                    <i class="fas fa-times"></i>
                  </a>
                </div>
              </div>
            </div>
            <a v-else>
              <p
                @click="editDescription = true"
                class="subtitle is-size-6 clickable-form"
              >
                {{ goal.description }}
              </p>
            </a>
            <div class="level">
              <div class="level-item has-text-centered">
                <div class="goal-card-stat">
                  <p class="title is-size-5 has-text-weight-bold">
                    {{ goal.timeRequired | urgencyEmoji(completionDate) }}
                  </p>
                  <p class="is-size-7 has-text-weight-bold">Urgency</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div class="goal-card-stat">
                  <p class="title is-size-5 has-text-weight-bold">
                    {{ actionsFinished }}
                  </p>
                  <p class="is-size-7 has-text-weight-bold">Actions finished</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div class="goal-card-stat">
                  <p class="title is-size-5 has-text-weight-bold">
                    {{ remainingActions }}
                  </p>
                  <p class="is-size-7 has-text-weight-bold">
                    Actions remaining
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <b-dropdown
                  position="is-bottom-right"
                  append-to-body
                  aria-role="menu"
                  trap-focus
                >
                  <a slot="trigger" role="button">
                    <div class="action goal-card-stat--active">
                      <p class="title is-size-5 has-text-weight-bold">7</p>
                      <p class="is-size-7 has-text-weight-bold">Days left</p>
                    </div>
                  </a>
                  <b-dropdown-item
                    aria-role="menu-item"
                    :focusable="false"
                    custom
                    paddingless
                  >
                    <div class="modal-card" style="width:320px;">
                      <b-datepicker
                        v-model="completionDate"
                        inline
                        size="is-small"
                      ></b-datepicker>
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div>
              <progress
                class="progress is-small is-primary"
                :value="goal.timeFinished"
                :max="goal.timeRequired"
              />
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box has-shadow-border">
            <p class="is-size-5 has-text-weight-bold tile-title">Activity</p>
            <ActivityChart :height="200" />
          </article>
        </div>
      </div>
      <div class="tile is-parent fits-screen-height">
        <div class="tile is-child box has-shadow-border">
          <ActionList :actions="actions" :goalId="goal['.key']" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emojiStatus from '@/mixins/emojiStatus';
import asyncDataStatus from '@/mixins/asyncDataStatus';
import ActionList from '@/components/ActionList';
import ActivityChart from '@/components/activity-chart';
import { mapActions } from 'vuex';

export default {
  name: 'GoalDetail',

  props: {
    id: {
      required: true,
      type: String,
    },
  },

  components: {
    ActivityChart,
    ActionList,
  },

  mixins: [asyncDataStatus, emojiStatus],

  data() {
    return {
      editDescription: false,
      editTitle: false,
    };
  },

  computed: {
    goal() {
      return { ...this.$store.state.goals.items[this.id] };
    },

    completionDate() {
      return this.goal.completionDate.toDate();
    },

    actions() {
      return Object.values(this.$store.state.actions.items).filter(
        action => action.goalId === this.id,
      );
    },

    actionsAreEmpty() {
      return !this.goal.actions;
    },

    remainingActions() {
      return this.goal.totalActions - this.goal.actionsFinished;
    },

    actionsFinished() {
      return this.goal.actionsFinished;
    },
  },

  methods: {
    ...mapActions('goals', ['fetchGoal', 'updateGoal']),
    ...mapActions('actions', ['fetchGoalActions']),
    ...mapActions('users', ['fetchUsers']),

    scrollToFinished() {
      let finished = this.$el.querySelector('#finished');
      finished.scrollTop = finished.scrollHeight;
    },

    updateTitle() {
      this.update();
      this.editTitle = false;
    },

    updateDescription() {
      this.update();
      this.editDescription = false;
    },

    update() {
      this.updateGoal({ id: this.goal['.key'], updatedGoal: this.goal });
    },
  },

  async created() {
    await this.fetchGoalActions(this.id);
    const goal = await this.fetchGoal(this.id);
    await this.fetchUsers(goal.members);
    this.asyncDataStatus_fetched();
  },
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 100ms cubic-bezier(0, 0.09, 0.33, 0.97);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 50ms ease-in-out;
}
.fade-enter,
.fade-leave-to {
  display: none;
  opacity: 0;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(15px);
  opacity: 0;
}

.ps {
  height: 420px;
}

.slide-fade-down-enter,
.slide-fade-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-down-enter-active,
.slide-fade-down-leave-active {
  transition: all 200ms cubic-bezier(0, 0.09, 0.33, 0.97);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 100ms ease-in-out;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(500px);
}

.tile-title {
  margin: 0 0 1em 1em;
}
</style>
