<template>
  <div>
    <p
      v-if="isInCreationMode"
      class="subtitle has-text-weight-bold has-text-centered"
    >
      New action
    </p>
    <div class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <p class="title">{{ currentActionEmoji }}</p>
        </div>
      </div>
      <transition name="fade">
        <div class="level-item">
          <p v-if="!isInEditMode && !isInCreationMode" class="action-text">
            {{ clonedAction.title }}
          </p>
          <div v-else>
            <input
              v-model="clonedAction.title"
              class="input"
              type="text"
              placeholder="Name your action"
            />
          </div>
        </div>
      </transition>
      <div class="level-right" tabindex="-1">
        <div class="level-item">
          <span v-if="isInCreationMode">
            <p
              @click="cancelActionInsert"
              class="is-small is-pulled-right action-button"
            >
              <i class="fas fa-times"></i>
            </p>
            <p
              @click="submitAction"
              class="is-small is-pulled-right action-button is-check"
            >
              <i class="fas fa-check"></i>
            </p>
          </span>
          <span v-else>
            <p
              @click="update"
              v-if="!isInEditMode"
              class="is-small is-pulled-right action-button"
            >
              <i class="fas fa-check"></i>
            </p>
            <p
              @click="deleteAction"
              v-else
              class="is-small is-pulled-right action-button"
            >
              <i class="fas fa-times"></i>
            </p>
          </span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <b-field v-if="isInEditMode || isInCreationMode">
        <b-slider
          type="is-info"
          :min="0"
          :max="10"
          :step="0.1"
          :custom-formatter="workHoursTooltip"
          tooltip-type="is-white"
          v-model="clonedAction.workHours"
        ></b-slider>
      </b-field>
    </transition>
  </div>
</template>

<script>
import { getWorkHoursInEmoji } from '@/shared/constants';

export default {
  name: 'Action',
  props: {
    action: {
      type: Object,
      default: () => {
        return {
          title: '',
          workHours: 1,
        };
      },
    },
    isInEditMode: {
      type: Boolean,
      default: false,
    },
    isInCreationMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clonedAction: { ...this.action },
      isCompleted: [],
    };
  },
  methods: {
    workHoursTooltip(val) {
      return `${val} hours`;
    },

    update() {
      this.$emit('actionUpdated', this.clonedAction);
    },

    deleteAction() {
      this.$emit('actionDeleted');
    },

    submitAction() {},

    cancelActionInsert() {
      this.$emit('insertionCanceled');
    },
  },
  computed: {
    currentActionEmoji: function() {
      return getWorkHoursInEmoji(this.clonedAction.workHours);
    },
  },
};
</script>

<style scoped>
.action-text {
  overflow: hidden;
  padding: 0 1rem 0 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms cubic-bezier(0, 0.09, 0.33, 0.97);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
