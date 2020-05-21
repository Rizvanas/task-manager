<template>
  <div>
    <div class="level is-marginless">
      <div class="level-left level-item">
        <p class="is-size-5 has-text-weight-bold tile-title">Actions</p>
      </div>
      <div class="level-right level-item" style="margin-bottom: 1.25em;">
        <transition name="slide-fade">
          <a
            v-if="!editMode && !insertMode"
            @click="insertMode = true"
            class="is-small edit-button"
          >
            <i class="fas fa-plus"></i>
          </a>
          <a
            v-else-if="!insertMode || editMode"
            @click="saveChanges"
            class="is-small edit-button is-approve"
          >
            <i class="fas fa-check"></i>
          </a>
        </transition>
        <transition name="fade">
          <a
            v-if="!editMode"
            @click="editMode = true"
            class="is-small edit-button"
          >
            <i class="fas fa-pen"></i>
          </a>
          <a
            v-else-if="!insertMode || editMode"
            @click="cancelChanges"
            class="is-small edit-button is-delete"
          >
            <i class="fas fa-times"></i>
          </a>
        </transition>
      </div>
    </div>
    <perfect-scrollbar :options="options">
      <ul class="menu menu-list">
        <li v-if="insertMode">
          <p class="action-list-item action is-edited">
            <ActionForm
              :goalId="goalId"
              @cancel="insertMode = false"
              @create="insertMode = false"
            />
          </p>
        </li>
        <transition-group name="list" tag="li">
          <li v-for="action in filteredActions" :key="action.id">
            <p
              v-if="action.isFinished"
              class="action-list-item action is-finished"
            >
              <FinishedAction :action="action" />
            </p>
            <p v-else class="action" :class="{ 'is-edited': editMode }">
              <transition name="fade">
                <ActionForm
                  v-if="editMode"
                  :action="action"
                  :goalId="goalId"
                  @update="addToUpdates"
                  @remove="addToDeletes"
                />
                <ActionItem v-else :action="action" />
              </transition>
            </p>
          </li>
        </transition-group>
      </ul>
    </perfect-scrollbar>
    <transition name="fade">
      <div class="level has-text-centered">
        <div class="level-item">
          <button
            @click="filter = 'active'"
            class="button button-special--filter"
            :class="{
              selected: currentFilter === 'active',
            }"
          >
            <span>Active</span>
          </button>
          <button
            v-if="!insertMode && !editMode"
            @click="filter = 'finished'"
            class="button button-special--filter"
            :class="{
              selected: currentFilter === 'finished',
            }"
          >
            <span>Finished</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ActionItem from '@/components/ActionItem';
import ActionForm from '@/components/ActionForm';
import FinishedAction from '@/components/FinishedAction';
import { mapActions } from 'vuex';

const actionFilters = {
  active: function(actions) {
    return actions.filter(action => !action.isFinished);
  },

  finished: function(actions) {
    if (this.editMode || this.insertMode) {
      this.filter = 'active';
      return actions;
    }
    return actions.filter(action => action.isFinished);
  },
};

export default {
  name: 'ActionList',

  components: {
    ActionItem,
    ActionForm,
    FinishedAction,
  },

  props: {
    actions: {
      type: Array,
      required: true,
    },
    goalId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      editMode: false,
      insertMode: false,
      filter: 'active',
      options: { wheelPropagation: false },
      updates: {},
      deletes: {},
    };
  },

  computed: {
    currentFilter() {
      return !this.editMode && !this.insertMode && this.filter === 'finished'
        ? 'finished'
        : 'active';
    },

    filteredActions() {
      return actionFilters[this.currentFilter](this.actions);
    },
  },

  methods: {
    ...mapActions('actions', ['updateActionList']),

    addToUpdates(action) {
      if (!this.deletes[action.id]) {
        this.updates[action.id] = { ...action };
      }
    },

    addToDeletes(id) {
      if (this.updates[id]) {
        delete this.updates[id];
      }

      this.deletes[id] = true;
    },

    cancelChanges() {
      this.editMode = false;
      this.updates = {};
      this.deletes = {};
    },

    async saveChanges() {
      this.editMode = false;

      await this.updateActionList({
        updates: Object.values(this.updates),
        deletes: Object.keys(this.deletes),
        goalId: this.goalId,
      });

      this.updates = {};
      this.deletes = {};
    },
  },
};
</script>

<style scoped>
.tile-title {
  margin: 0 0 1em 1em;
}

.ps {
  height: 410px;
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
</style>
