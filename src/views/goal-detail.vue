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
                  <p class="heading">Urgency</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div class="goal-card-stat">
                  <p class="title">9</p>
                  <p class="heading">Tasks finished</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <b-dropdown
                  position="is-bottom-left"
                  append-to-body
                  aria-role="menu"
                  trap-focus
                >
                  <a slot="trigger" role="button">
                    <div class="action goal-card-stat">
                      <p class="title">7</p>
                      <p class="heading">Days left</p>
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
          <perfect-scrollbar>
            <ul class="menu menu-list">
              <a v-if="insertMode" class="action is-edited">
                <Action
                  :isInCreationMode="true"
                  @insertionCanceled="turnOffInsertMode"
                />
              </a>
              <transition name="slide">
                <div key="1" v-if="!displayFinishedActions">
                  <li v-for="action in goal.actions" :key="action.id">
                    <a class="action" :class="{ 'is-edited': editMode }">
                      <Action :action="action" :isInEditMode="editMode" />
                    </a>
                  </li>
                </div>
                <div v-else>
                  <li v-for="action in goal.finishedActions" :key="action.id">
                    <a class="action" :class="{ 'is-edited': editMode }">
                      <Action :action="action" :isInEditMode="editMode" />
                    </a>
                  </li>
                </div>
              </transition>
            </ul>
          </perfect-scrollbar>
          <transition name="fade">
            <div v-if="!editMode" class="container has-text-centered">
              <button
                @click="displayFinishedActions = !displayFinishedActions"
                class="button button-special is-blue is-rounded"
              >
                <span class="icon is-small">
                  <i v-if="displayFinishedActions" class="fas fa-angle-up"></i>
                  <i v-else class="fas fa-angle-down"></i>
                </span>
                <span v-if="displayFinishedActions">Active</span>
                <span v-else>Finished</span>
              </button>
            </div>
          </transition>
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
      insertMode: false,
      displayFinishedActions: false,
      editDescription: false,
      editTitle: false,
    };
  },
  created() {
    this.goal = {
      title: 'Read another shitty book',
      description:
        'Read a shitty self help book to get inspired for a meme app',
      completionDate: new Date(),
      actions: [
        { id: 1, title: 'Random Task #1', workHours: 5, isFinished: false },
        { id: 2, title: 'Generic Task #2', workHours: 3, isFinished: false },
        { id: 3, title: 'Shitty Task #3', workHours: 10, isFinished: false },
        { id: 4, title: 'Gay Task #4', workHours: 6, isFinished: false },
        { id: 5, title: 'Meh Task #5', workHours: 7, isFinished: false },
        { id: 6, title: 'Funny Task #6', workHours: 6, isFinished: false },
      ],
      finishedActions: [
        { id: 8, title: 'Finished task #1', workHours: 8, isFinished: true },
        { id: 9, title: 'Finished task #2', workHours: 8, isFinished: true },
        { id: 10, title: 'Finished task #3', workHours: 8, isFinished: true },
        { id: 11, title: 'Finished task #4', workHours: 8, isFinished: true },
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
    setInsertMode() {
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
  },
};
</script>

<style scoped>
.actions-container {
  height: 30vh;
}
.slide-fade-enter-active,
.slide-fade-leave-active,
.fade-enter-active,
.fade-enter-active,
.fade-enter,
.fade-leave-to {
  transition: all 100ms cubic-bezier(0, 0.09, 0.33, 0.97);
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
  transition: all 300ms ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter {
  transform: translateY(420px);
}

.slide-leave-to {
  transform: translateY(-420px);
}

.slide-enter-to,
.slide-leave {
  transition: all 3s ease-in-out;
}
</style>
