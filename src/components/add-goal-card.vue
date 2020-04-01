<template>
  <form class="box has-shadow">
    <div class="one-line-items is-marginless"></div>
    <div class="card-content">
      <b-steps v-model="activeStep" :has-navigation="true" type="is-info">
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
          <AddActionForm v-if="addNewAction" />
        </b-step-item>

        <template slot="navigation" slot-scope="{ previous, next }">
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
import AddActionForm from '@/components/add-action-form';

export default {
  name: 'AddGoalCard',

  components: { AddActionForm },

  data() {
    return {
      deadline: new Date(),
      gotSelected: false,
      showDatepicker: false,
      addNewAction: false,
      activeStep: 0,
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
    minDate: function() {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    },
  },
};
</script>
