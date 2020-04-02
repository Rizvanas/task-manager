<template>
  <div class="field has-addons">
    <div class="control">
      <b-dropdown
        style="overflow: visible !important;"
        position="is-bottom-right"
        append-to-body
        aria-role="menu"
        trap-focus
      >
        <a class="button" slot="trigger" role="button">
          <span>{{ currentActionEmoji }}</span>
        </a>
        <b-dropdown-item custom focusable>
          <div class="has-shadow">
            <b-field>
              <b-slider
                aria-role
                @active-change="dropdownActivated"
                @change="update"
                label="Time action will take"
                type="is-info"
                :min="0"
                :max="10"
                :step="0.1"
                :custom-formatter="emojiTooltip"
                tooltip-type="is-white"
                v-model="clonedAction.workHours"
              >
                <template v-for="val in [0, 2, 4, 6, 8, 10]">
                  <b-slider-tick :value="val" :key="val">
                    {{ val }}
                  </b-slider-tick>
                </template>
              </b-slider>
            </b-field>
          </div>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <p class="control is-expanded">
      <input
        @keyup="update"
        type="text"
        class="input is-fullwidth"
        placeholder="Name your action"
        v-model="clonedAction.title"
      />
    </p>
    <p class="control">
      <button @click="deleteAction" type="button" class="button">
        <span class>
          <i class="fas fa-times"></i>
        </span>
      </button>
    </p>
  </div>
</template>

<script>
import { getWorkHoursInEmoji } from '@/shared/constants';

export default {
  name: 'Action',
  data() {
    return {
      clonedAction: { ...this.action },
    };
  },
  methods: {
    emojiTooltip(val) {
      const emoji = getWorkHoursInEmoji(val);
      return emoji;
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
  },
};
</script>
