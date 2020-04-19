<template>
  <section class="section">
    <div class="tile is-ancestor">
      <div class="tile is-7 is-vertical is-fullheight">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child box has-shadow-border">
            <div class="one-line-form" v-if="editTitle">
              <div class="field">
                <div class="control">
                  <input
                    v-model="goal.title"
                    class="title input is-fullwidth"
                    type="text"
                    placeholder="Name your goal"
                  />
                </div>
              </div>
              <div class="field is-pulled-right">
                <div class="control">
                  <a
                    @mouseenter="hovered = true"
                    @mouseleave="hovered = false"
                    @click="saveChanges"
                    class="is-small action-button--submit"
                  >
                    <i class="fas fa-check"></i>
                  </a>
                  <a
                    @mouseenter="hovered = true"
                    @mouseleave="hovered = false"
                    class="is-small action-button--cancel"
                  >
                    <i class="fas fa-times"></i>
                  </a>
                </div>
              </div>
            </div>
            <a v-else>
              <p @click="enableTitleEditor" class="title clickable-form">
                {{ goal.title }}
              </p>
            </a>
            <hr />
            <div class="one-line-form" v-if="editDescription">
              <div class="field">
                <div class="control">
                  <input
                    v-model="goal.description"
                    class="subtitle input"
                    type="text"
                    placeholder="Describe your goal"
                  />
                </div>
              </div>
              <div class="field is-pulled-right">
                <div class="control">
                  <a
                    @mouseenter="hovered = true"
                    @mouseleave="hovered = false"
                    @click="saveChanges"
                    class="is-small action-button--submit"
                  >
                    <i class="fas fa-check"></i>
                  </a>
                  <a
                    @mouseenter="hovered = true"
                    @mouseleave="hovered = false"
                    class="is-small action-button--cancel"
                  >
                    <i class="fas fa-times"></i>
                  </a>
                </div>
              </div>
            </div>
            <a v-else>
              <p
                @click="enableDescriptionEditor"
                class="subtitle clickable-form"
              >
                {{ goal.description }}
              </p>
            </a>
            <br />
            <div class="level">
              <div class="level-item has-text-centered">
                <div class="goal-card-stat">
                  <p class="title">🧊</p>
                  <p class="heading has-text-weight-bold">Urgency</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div class="goal-card-stat">
                  <p class="title">{{ actionsFinished }}</p>
                  <p class="heading has-text-weight-bold">Actions finished</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div class="goal-card-stat">
                  <p class="title">{{ remainingActions }}</p>
                  <p class="heading has-text-weight-bold">Actions remaining</p>
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
                      <p class="title">7</p>
                      <p class="heading has-text-weight-bold">Days left</p>
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
                        v-model="goal.completionDate"
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
      <div class="tile is-parent fits-screen-height">
        <div class="tile is-child box has-shadow-border">
          <div class="level is-marginless">
            <div class="level-right level-item">
              <transition name="slide-fade">
                <a
                  v-if="!editMode && !insertMode"
                  @mouseenter="hovered = true"
                  @mouseleave="hovered = false"
                  @click="setInsertMode"
                  class="is-small edit-button"
                >
                  <i class="fas fa-plus"></i>
                </a>
                <a
                  v-else-if="!insertMode || editMode"
                  @mouseenter="hovered = true"
                  @mouseleave="hovered = false"
                  @click="saveChanges"
                  class="is-small edit-button is-approve"
                >
                  <i class="fas fa-check"></i>
                </a>
              </transition>
              <transition name="fade">
                <a
                  v-if="!editMode"
                  @mouseenter="hovered = true"
                  @mouseleave="hovered = false"
                  @click="setEditMode"
                  class="is-small edit-button"
                >
                  <i class="fas fa-pen"></i>
                </a>
                <a
                  v-else-if="!insertMode || editMode"
                  @mouseenter="hovered = true"
                  @mouseleave="hovered = false"
                  @click="turnOffEditMode"
                  class="is-small edit-button is-delete"
                >
                  <i class="fas fa-times"></i>
                </a>
              </transition>
            </div>
          </div>
          <p class="subtitle has-text-weight-bold has-text-centered">Actions</p>
          <perfect-scrollbar :options="options">
            <ul class="menu menu-list">
              <li v-if="insertMode">
                <a class="action is-edited">
                  <ActionForm />
                </a>
              </li>
              <transition-group name="list" tag="li">
                <li v-for="action in actions" :key="action.id">
                  <a v-if="action.isFinished" class="action is-finished">
                    <FinishedAction :action="actiion" />
                  </a>
                  <a v-else class="action" :class="{ 'is-edited': editMode }">
                    <transition name="fade">
                      <ActionForm v-if="editMode" :action="action" />
                      <Action
                        v-else
                        :action="action"
                        @actionStateChange="changeActionState"
                        @actionFinished="finishAction"
                      />
                    </transition>
                  </a>
                </li>
              </transition-group>
            </ul>
          </perfect-scrollbar>
          <transition name="fade">
            <div class="level has-text-centered">
              <div class="level-item">
                <button
                  @click="currentFilter = 'active'"
                  class="button button-special--filter is-rounded"
                  :class="{ selected: currentFilter === 'active' }"
                >
                  <span>Active</span>
                </button>
                <button
                  v-if="!insertMode && !editMode"
                  @click="currentFilter = 'finished'"
                  class="button button-special--filter is-rounded"
                  :class="{ selected: currentFilter === 'finished' }"
                >
                  <span>Finished</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Action from '@/components/action';
import ActionForm from '@/components/action-form';
import FinishedAction from '@/components/finished-action';
import ActivityChart from '@/components/activity-chart';
import { mapActions } from 'vuex';

var actionFilters = {
  active: function(actions) {
    return actions;
  },
  finished: function(actions) {
    if (this.editMode || this.insertMode) {
      return actions;
    }
    return actions;
  },
};

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
    Action,
    ActionForm,
    FinishedAction,
  },
  data() {
    return {
      goalActions: [],
      hovered: false,
      editMode: false,
      insertMode: false,
      displayFinishedActions: false,
      editDescription: false,
      editTitle: false,
      currentFilter: 'active',
      options: { wheelPropagation: false },
    };
  },

  firestore() {
    return {
      goalActions: this.actionsCollection.orderBy('isActive'),
    };
  },

  methods: {
    ...mapActions(['fetchGoal', 'fetchGoalActions']),

    toggleHover() {
      this.hover = !this.hover;
    },

    setEditMode() {
      if (!this.editMode) {
        this.editMode = true;
        this.currentFilter = 'active';
      }
    },
    turnOffEditMode() {
      if (this.editMode) {
        this.editMode = false;
      }
    },
    setInsertMode() {
      this.currentFilter = 'active';
      if (!this.insertMode) {
        this.insertMode = true;
      }
    },
    turnOffInsertMode() {
      if (this.insertMode) {
        this.insertMode = false;
      }
    },
    saveChanges() {},
    addNewAction() {},
    enableTitleEditor() {
      this.editTitle = true;
    },
    enableDescriptionEditor() {
      this.editDescription = true;
    },

    scrollToFinished() {
      let finished = this.$el.querySelector('#finished');
      finished.scrollTop = finished.scrollHeight;
    },

    isSelectedFilter(filterNum) {
      return this.filterNum === filterNum;
    },

    changeActionState(updatedAction) {
      const index = this.actions.findIndex(a => a.id === updatedAction.id);
      if (index > 0) {
        this.actions[index] = updatedAction;
      }
    },

    finishAction(id) {
      const index = this.actions.findIndex(a => a._id === id);
      if (index >= 0) {
        this.actions[index].isFinished = true;
      }
    },
  },

  computed: {
    goal() {
      return this.$store.state.goals[this.id];
    },

    actionsCollection() {
      return this.$store.state.actions[this.id];
    },

    actionsAreEmpty() {
      return !this.goal.actions;
    },

    actions() {
      return actionFilters[this.currentFilter](this.goalActions);
    },

    remainingActions() {
      return this.goal.totalActions - this.goal.completedActions;
    },

    actionsFinished() {
      return this.goal.completedActions;
    },
  },

  async created() {
    const goal = await this.fetchGoal(this.id);
    if (goal) {
      await this.fetchGoalActions(this.id);
    }
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

.list-enter-active,
.list-leave-active {
  transition: all 100ms ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
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
</style>
