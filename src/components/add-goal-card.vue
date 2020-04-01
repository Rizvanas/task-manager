<template>
  <form class="box has-shadow">
    <div class="one-line-items is-marginless"></div>
    <div class="card-content">
      <b-steps
        v-model="activeStep"
        :animated="isAnimated"
        :has-navigation="hasNavigation"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        type="is-info"
      >
        <b-step-item label="Description">
          <h1 class="title has-text-weight-bold has-text-centered">
            Describe your goal
          </h1>
          <div class="field">
            <div class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Name your goal"
                autofocus="autofocus"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-heading"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea
                class="textarea has-fixed-size"
                placeholder="Describe what you are trying to achieve"
                rows="3"
              ></textarea>
            </div>
          </div>
          <b-field>
            <b-datepicker
              v-model="deadline"
              :date-formatter="daysLeft"
              :min-date="minDate"
              trap-focus
            ></b-datepicker>
          </b-field>
        </b-step-item>

        <b-step-item label="Actions" disabled>
          <h1 class="title has-text-weight-bold has-text-centered">
            Actions to achieve goal
          </h1>
          <div class="field">
            <a
              @click="addNewAction = true"
              class="button is-fullwidth is-outlined"
            >
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
              <span>Add new action</span>
            </a>
          </div>
          <transition appear>
            <div v-if="addNewAction" class="box has-border">
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
                        <span>💩</span>
                      </a>
                      <b-dropdown-item :focusable="false" custom>
                        <div class="has-shadow" style="width:242px;">
                          <b-field>
                            <b-slider
                              aria-label="Fan"
                              label="Time action will take"
                              type="is-info"
                              :min="0"
                              :max="8"
                            >
                              <template v-for="val in [0, 4, 8]">
                                <b-slider-tick :value="val" :key="val">{{
                                  val
                                }}</b-slider-tick>
                              </template>
                            </b-slider>
                          </b-field>
                        </div>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <p class="control">
                    <input
                      type="text"
                      class="input"
                      placeholder="Name your action"
                    />
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
          </transition>
        </b-step-item>

        <template
          v-if="customNavigation"
          slot="navigation"
          slot-scope="{ previous, next }"
        >
          <b-button
            outlined
            type="is-danger"
            icon-pack="fas"
            icon-left="backward"
            :disabled="previous.disabled"
            @click.prevent="previous.action"
            >Previous</b-button
          >
          <b-button
            outlined
            type="is-success"
            icon-pack="fas"
            icon-right="forward"
            :disabled="next.disabled"
            @click.prevent="next.action"
            >Next</b-button
          >
        </template>
      </b-steps>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddGoalCard',
  data() {
    return {
      deadline: new Date(),
      gotSelected: false,
      showDatepicker: false,
      addNewAction: false,
    };
  },
  methods: {
    daysLeft() {
      const now = new Date();
      const end = new Date(this.deadline);
      return (
        '🔥 ' +
        Math.floor(
          (Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
            Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) /
            (1000 * 60 * 60 * 24),
        ).toString() +
        ' days left'
      );
    },
    toggleShowDatepicker() {
      this.$refs.datepicker.toggle();
    },
  },
  computed: {
    minDate() {
      const today = new Date();

      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    },
  },
};
</script>
