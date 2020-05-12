<template>
  <div>
    <div v-if="creationState" class="has-text-centered subtitle">
      <p class="has-text-weight-bold">New action</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <UserSelectionList
          :users="users"
          :assignedUserId="clonedAction.assignedUserId"
          @newUserAssigned="assignNewUser"
        />
      </div>
      <transition name="fade">
        <div class="control is-expanded action-form-input">
          <input
            v-model="clonedAction.title"
            @input="update"
            class="input is-static"
            type="text"
            placeholder="Name your action"
          />
        </div>
      </transition>
      <div class="control">
        <div class="level-item">
          <p
            v-if="creationState"
            @click="create"
            class="is-small is-pulled-right action-button is-check"
          >
            <span class="icon is-small">
              <i class="fas fa-check"></i>
            </span>
          </p>
          <p
            @click="cancel"
            class="is-small is-pulled-right action-button"
            :class="{ 'is-check': markedForDeletion == true }"
          >
            <span class="icon is-small">
              <i v-if="markedForDeletion" class="fas fa-plus"></i>
              <i v-else class="fas fa-minus"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-grouped columns is-vcentered difficulty-slider">
      <div class="column is-1 control">
        <span class="title is-size-4">{{
          clonedAction.timeExpected | hoursEmoji
        }}</span>
      </div>
      <div class="column is-10 control">
        <transition name="fade">
          <b-field>
            <b-slider
              type="is-info"
              :min="0"
              :max="36000"
              :step="60"
              :custom-formatter="workHoursTooltip"
              tooltip-type="is-white"
              v-model="clonedAction.timeExpected"
              @
              @change="update"
            ></b-slider>
          </b-field>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import emojiStatus from '@/mixins/emojiStatus';
import UserSelectionList from '@/components/UserSelectionList';

export default {
  name: 'ActionForm',

  components: {
    UserSelectionList,
  },

  props: {
    action: {
      type: Object,
      default: () => {
        return {
          title: '',
          timeExpected: 3600,
        };
      },
    },

    goalId: {
      type: String,
      default: null,
    },
  },

  created() {
    this.creationState = this.action.id == undefined;
    if (!this.clonedAction.assignedUserId) {
      this.clonedAction.assignedUserId = this.$store.state.auth.authId;
    }
  },

  data() {
    return {
      creationState: false,
      markedForDeletion: false,
      clonedAction: { ...this.action, id: this.action.id },
    };
  },

  mixins: [emojiStatus],

  computed: {
    users() {
      return this.$store.state.users.items;
    },

    assignedUserId() {
      return this.clonedAction.assignedUserId;
    },
  },

  methods: {
    ...mapActions('actions', ['createAction']),

    async create() {
      this.$emit('create');

      await this.createAction({ ...this.clonedAction, goalId: this.goalId });
    },

    cancel() {
      this.creationState;
      if (this.creationState) {
        this.$emit('cancel');
      } else {
        this.markedForDeletion = true;
        this.$emit('remove', this.clonedAction.id);
      }
    },

    assignNewUser(id) {
      this.clonedAction.assignedUserId = id;
      this.update();
    },

    update() {
      if (!this.creationState) {
        this.$emit('update', this.clonedAction);
      }
    },

    workHoursTooltip(seconds) {
      const hours = Math.trunc(seconds / 3600);
      const minutes = Math.trunc((seconds % 3600) / 60);
      return `${hours}h ${minutes}min`;
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms cubic-bezier(0, 0.09, 0.33, 0.97);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.difficulty-slider {
  margin: 0 0;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 7px 25px 0;
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);

  &:hover {
    box-shadow: 0px 4px 8px rgba(50, 115, 220, 0.4);
  }
}

.action-form-input {
  @extend .difficulty-slider;
  padding: 0 0.5em;
  &:hover,
  &.selected {
    color: #3273dc;
  }
}
</style>
