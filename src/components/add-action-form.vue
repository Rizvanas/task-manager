<template>
  <div class="box has-border">
    <div class="card-content">
      <div class="field has-addons">
        <div class="control">
          <b-dropdown
            position="is-left"
            append-to-body
            aria-role="menu"
            trap-focus
          >
            <a class="button" slot="trigger" role="button">
              <span>{{ currentActionEmoji }}</span>
            </a>
            <b-dropdown-item :focusable="false" custom>
              <div class="has-shadow" style="width:242px;">
                <b-field>
                  <b-slider
                    label="Time action will take"
                    type="is-info"
                    :min="0"
                    :max="10"
                    :step="0.1"
                    :custom-formatter="emojiTooltip"
                    tooltip-type="is-white"
                    v-model="workHours"
                    lazy
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
        <p class="control">
          <input type="text" class="input" placeholder="Name your action" />
        </p>
      </div>
    </div>
    <div class="buttons is-centered">
      <button class="button is-primary is-rounded">
        <span class="icon is-small">
          <i class="fas fa-save"></i>
        </span>
        <span>Save</span>
      </button>
      <button class="button is-danger is-rounded is-outlined">
        <span class="icon is-small">
          <i class="fas fa-times"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { getWorkHoursInEmoji } from '@/shared/constants';
export default {
  name: 'AddActionForm',

  data() {
    return {
      workHours: 0,
    };
  },
  methods: {
    emojiTooltip(val) {
      const emoji = getWorkHoursInEmoji(val);
      return emoji;
    },
  },
  computed: {
    currentActionEmoji: function() {
      return getWorkHoursInEmoji(this.workHours);
    },
  },
};
</script>
