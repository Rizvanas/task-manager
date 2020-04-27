<template>
  <div>
    <div class="level is-marginless">
      <div class="level-right level-item">
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
            @click="editMode = false"
            class="is-small edit-button is-delete"
          >
            <i class="fas fa-times"></i>
          </a>
        </transition>
      </div>
    </div>
    <p class="is-size-5 has-text-weight-bold tile-title">Actions</p>
    <perfect-scrollbar :options="options">
      <ul class="menu menu-list">
        <li v-if="insertMode">
          <p class="action-list-item action is-edited">
            <ActionForm :goalId="goalId" />
          </p>
        </li>
        <transition-group name="list" tag="li">
          <li v-for="action in filteredActions" :key="action['.key']">
            <p
              v-if="action.isFinished"
              class="action-list-item action is-finished"
            >
              <FinishedAction :action="action" />
            </p>
            <p v-else class="action" :class="{ 'is-edited': editMode }">
              <transition name="fade">
                <ActionForm v-if="editMode" :action="action" :goalId="goalId" />
                <Action
                  v-else
                  :action="action"
                  @actionStateChange="changeActionState"
                  @actionFinished="finishAction"
                />
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
import Action from '@/components/action';
import ActionForm from '@/components/action-form';
import FinishedAction from '@/components/finished-action';

const actionFilters = {
  active: function(actions) {
    return actions;
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
    Action,
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
    changeActionState() {},
    finishAction() {},
    saveChanges() {},
  },
};
</script>

<style scoped>
.tile-title {
  margin: 0 0 1em 1em;
}

.ps {
  height: 420px;
}
</style>