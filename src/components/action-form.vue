<template>
  <div>
    <div class="has-text-centered subtitle">
      <p v-if="creationState" class="has-text-weight-bold">New action</p>
    </div>
    <div class="level">
      <div class="level-left">
        <div class="level-item has-text-centered">
          <p class="title">{{ currentActionEmoji }}</p>
        </div>
      </div>
      <transition name="fade">
        <div class="level-item">
          <div class="field">
            <div class="control">
              <input
                v-model="clonedAction.title"
                class="input"
                type="text"
                placeholder="Name your action"
              />
            </div>
          </div>
        </div>
      </transition>
      <div class="level-right">
        <div class="level-item">
          <span>
            <p @click="remove" class="is-small is-pulled-right action-button">
              <i class="fas fa-times"></i>
            </p>
            <p
              v-if="creationState"
              @click="submit"
              class="is-small is-pulled-right action-button is-check"
            >
              <i class="fas fa-check"></i>
            </p>
          </span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <b-field>
        <b-slider
          type="is-info"
          :min="0"
          :max="10"
          :step="0.1"
          :custom-formatter="workHoursTooltip"
          tooltip-type="is-white"
          v-model="clonedAction.expectedHours"
        ></b-slider>
      </b-field>
    </transition>
  </div>
</template>

<script>
import ActionMixins from '@/mixins/action-mixins';

export default {
  name: 'ActionForm',

  props: {
    action: {
      type: Object,
      default: () => {
        return {
          title: '',
          expectedHours: 1,
        };
      },
    },
  },

  created() {
    this.creationState = this.action.id == undefined;
  },

  data() {
    return {
      creationState: false,
      clonedAction: { ...this.action },
    };
  },

  mixins: [ActionMixins],

  methods: {
    remove() {
      if (this.creationState) {
        this.$emit('canceled');
      } else {
        this.$emit('delete', this.clonedAction.id);
      }
    },
    submit() {
      this.$emit('actionCreated', this.clonedAction);
    },

    update() {
      this.update('actionUpdated', this.clonedAction);
    },

    workHoursTooltip(val) {
      return `${val} hours`;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 100ms cubic-bezier(0, 0.09, 0.33, 0.97);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
