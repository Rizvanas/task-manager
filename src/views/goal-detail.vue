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
              <transition-group name="list" tag="li">
                <li key="0" v-if="insertMode">
                  <a class="action is-edited">
                    <ActionForm />
                  </a>
                </li>
                <li v-for="action in actions" :key="action.id">
                  <a v-if="action.isFinished" class="action is-finished">
                    <FinishedAction :action="action" />
                  </a>
                  <a v-else class="action" :class="{ 'is-edited': editMode }">
                    <transition name="fade">
                      <ActionForm v-if="editMode" :action="action" />
                      <Action v-else :action="action" />
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

var actionFilters = {
  active: function(actions) {
    return actions.filter(action => !action.isFinished);
  },
  finished: function(actions) {
    if (this.editMode || this.insertMode) {
      return actions;
    }
    return actions.filter(action => action.isFinished);
  },
};

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
    ActionForm,
    FinishedAction,
  },
  data() {
    return {
      goal: {},
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
  created() {
    this.goal = {
      title: 'Read another shitty book',
      description:
        'Read a shitty self help book to get inspired for a meme app',
      completionDate: new Date(),
      actions: [
        {
          id: 1,
          title: 'Random Task #1',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isPaused: false,
          isFinished: false,
        },
        {
          id: 2,
          title: 'Generic Task #2',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 3,
          title: 'Shitty Task #3',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 4,
          title: 'Nice Task',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 5,
          title: 'Meh Task #5',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 6,
          title: 'Funny Task #6',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 7,
          title: 'Funny Task #6',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 8,
          title: 'Funny Task #6',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 9,
          title: 'Funny Task #6',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 10,
          title: 'Funny Task #6',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 11,
          title: 'Funny Task #6',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 12,
          title: 'Funny Task #6',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: false,
        },
        {
          id: 13,
          title: 'Finished task #1',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: true,
        },
        {
          id: 14,
          title: 'Finished task #2',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: true,
        },
        {
          id: 15,
          title: 'Finished task #3',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: true,
        },
        {
          id: 16,
          title: 'Finished task #4',
          expectedHours: 5,
          totalHours: 10,
          startTime: '',
          pauseTime: '',
          isStarted: false,
          isActive: false,
          isFinished: true,
        },
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
  },

  computed: {
    actions() {
      return actionFilters[this.currentFilter](this.goal.actions);
    },

    remainingActions() {
      return actionFilters.active(this.goal.actions).length;
    },

    actionsFinished() {
      return actionFilters.finished(this.goal.actions).length;
    },
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
