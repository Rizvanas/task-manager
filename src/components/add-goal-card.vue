<template>
  <form class="box has-shadow column is-12-tablet is-7-desktop is-6-widescreen">
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
            <a @click="addNewAction" class="button is-fullwidth is-outlined">
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
              <span>Add new action</span>
            </a>
          </div>
          <div v-if="actions.length > 0" class="box has-border" id="actions">
            <p class="subtitle has-text-weight-bold">Actions</p>
            <div class="actions-scroller" ref="actions">
              <Action
                v-for="action in actions"
                :key="action.id"
                :action="action"
                @actionUpdated="updateAction"
                @actionDeleted="deleteAction(action.id)"
              />
            </div>
          </div>
        </b-step-item>

        <template slot="navigation" slot-scope="{ previous, next }">
          <div class="is-marginless level">
            <b-button
              outlined
              type="is-primary"
              icon-pack="fas"
              icon-left="caret-left"
              :disabled="previous.disabled"
              @click.prevent="previous.action"
              >Previous</b-button
            >
            <b-button
              type="is-primary"
              custom-class="is-pulled-right"
              icon-pack="fas"
              icon-right="caret-right"
              :disabled="next.disabled"
              @click.prevent="next.action"
              >Next</b-button
            >
          </div>
        </template>
      </b-steps>
    </div>
  </form>
</template>

<script>
import Action from '@/components/action';

const actions = [];
export default {
  name: 'AddGoalCard',

  components: { Action },

  data() {
    return {
      deadline: new Date(),
      gotSelected: false,
      showDatepicker: false,
      activeStep: 0,
      actions: actions,
    };
  },

  updated() {
    this.scrollToEnd();
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

    addNewAction() {
      const id =
        this.actions.length === 0
          ? 1
          : this.actions[this.actions.length - 1].id + 1;
      this.actions.push({ id, title: '', workHours: 0 });
    },
    deleteAction(id) {
      const index = this.actions.findIndex(a => a.id === id);
      this.actions.splice(index, 1);
    },

    updateAction(action) {
      const index = this.actions.findIndex(a => a.id === action.id);
      if (index !== -1) {
        this.actions[index] = { ...action };
      }
    },
    scrollToEnd() {
      var content = this.$refs.actions;
      if (content != null) {
        content.scrollTop = content.scrollHeight + 10;
      }
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
