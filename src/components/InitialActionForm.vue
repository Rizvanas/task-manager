<template>
  <div>
    <label class="label">Initial action</label>
    <div class="initial-action">
      <div class="field is-grouped">
        <transition name="fade">
          <div
            class="control is-expanded action-form-input"
            :class="{ 'is-focused': isFocused('actionName') }"
          >
            <input
              v-model="action.title"
              @input="update"
              @focus="focused = 'actionName'"
              @blur="focused = null"
              class="input is-static"
              type="text"
              placeholder="Name your action"
            />
          </div>
        </transition>
      </div>
      <div class="field is-grouped columns is-vcentered difficulty-slider">
        <div class="column is-1 control">
          <span class="title is-size-4">{{
            action.timeExpected | hoursEmoji
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
                v-model="action.timeExpected"
                @change="update"
              ></b-slider>
            </b-field>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emojiStatus from '@/mixins/emojiStatus';

export default {
  name: 'InitialActionForm',
  props: {
    action: {
      type: Object,
      default: () => {
        return {
          title: null,
          timeExpected: 3600,
          timeTaken: 0,
        };
      },
    },
  },

  data() {
    return {
      focused: null,
    };
  },

  mixins: [emojiStatus],

  computed: {
    user() {
      return this.$store.state.users.items;
    },

    assignedUserId() {
      return this.state.auth.authId;
    },
  },

  methods: {
    update() {
      this.$emit('update', this.action);
    },

    workHoursTooltip(seconds) {
      const hours = Math.trunc(seconds / 3600);
      const minutes = Math.trunc((seconds % 3600) / 60);
      return `${hours}h ${minutes}min`;
    },

    isFocused(name) {
      return this.focused === name;
    },
  },

  created() {
    const authId = this.$store.state.auth.authId;
    this.action.assignedUserId = authId;
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
    box-shadow: 0px 4px 8px rgba(132, 156, 195, 0.8);
  }

  &.is-focused {
    box-shadow: 0px 4px 8px rgba(132, 156, 195, 0.8);
    background-color: #849cc3;
    color: #faf8ff;
  }
}

.action-form-input {
  @extend .difficulty-slider;
  padding: 0 0.5em;
}

.initial-action {
  border-radius: 6px;
  background-color: #fff;
  padding: 0.5em;
  min-height: 8.3em;
  box-shadow: rgba(0, 0, 0, 0.1) 0 7px 25px 0;
}
</style>
