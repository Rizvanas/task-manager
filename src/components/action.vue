<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <p class="title">{{ currentActionEmoji }}</p>
        </div>
      </div>
      <transition name="fade">
        <div class="level-item">
          <p v-if="!isInEditMode" class="action-text">
            {{ clonedAction.title }}
          </p>
          <div v-if="isInEditMode" class="field">
            <input
              v-model="clonedAction.title"
              class="input"
              type="text"
              placeholder="Text input"
            />
          </div>
        </div>
      </transition>

      <div class="level-right" tabindex="-1">
        <div class="level-item">
          <span>
            <p class="is-small is-pulled-right action-button">
              <i v-if="!isInEditMode" class="fas fa-check"></i>
              <i v-else class="fas fa-times"></i>
            </p>
          </span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <b-field v-if="isInEditMode">
        <b-slider
          label="Time action will take"
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
          workHours: 0,
        };
      },
    },
    isInEditMode: {
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
  transition: all 100ms cubic-bezier(0, 0.09, 0.33, 0.97);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
