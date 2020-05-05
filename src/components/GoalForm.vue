<template>
  <div v-if="asyncDataStatus_ready" class="overlay">
    <a @click="$emit('close')" class="escape-button is-pulled-left">
      <span>Esc</span>
    </a>
    <p class="title has-text-centered">Set new goal</p>
    <div class="overlay__inner">
      <form @submit.prevent="create" @input="debouncedUpdate">
        <div class="field">
          <label class="label">Title</label>
          <div
            class="control input-cool"
            :class="{ 'is-focused': isFocused('title') }"
          >
            <input
              @focus="focused = 'title'"
              @blur="focused = ''"
              class="input is-static"
              type="text"
              placeholder="Name your goal"
              v-model="goal.title"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div
            class="control input-cool"
            :class="{ 'is-focused': isFocused('description') }"
          >
            <textarea
              @focus="focused = 'description'"
              @blur="focused = ''"
              class="textarea"
              placeholder="Describe your goal"
              v-model="goal.description"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Achievement date</label>
          <div
            class="control input-cool"
            :class="{ 'is-focused': isFocused('date') }"
          >
            <input
              @focus="focused = 'date'"
              @blur="focused = ''"
              class="input is-static"
              type="text"
              placeholder="DD/MM/YYYY"
              v-mask="'##/##/####'"
              v-model="goal.completionDate"
            />
          </div>
        </div>
        <InitialActionForm
          v-if="goal.action"
          :action="goal.action"
          @update="updateGoalAction"
        />
        <InitialActionForm v-else @update="updateGoalAction" />
        <br />
        <div class="field is-grouped">
          <div class="control">
            <a @click="create" type="submit" class="form-button--submit"
              >Submit</a
            >
          </div>
          <div class="control">
            <a @click="cancel" class="form-button--cancel">Cancel</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { debounce, cloneDeep } from 'lodash';
import InitialActionForm from '@/components/InitialActionForm';
import asyncDataStatus from '@/mixins/asyncDataStatus';
import { format } from 'date-fns';
import { displayDateFormat } from '@/shared/constants';

export default {
  name: 'GoalForm',

  components: { InitialActionForm },

  data() {
    return {
      focused: null,
      goal: {
        title: null,
        description: null,
        completionDate: format(new Date(), displayDateFormat),
        action: null,
      },
    };
  },

  mixins: [asyncDataStatus],

  computed: {
    goalFormCreated() {
      return !!this.goal['.key'];
    },
  },

  methods: {
    ...mapActions('goals', [
      'fetchGoalForm',
      'updateGoalForm',
      'createGoal',
      'deleteGoalForm',
    ]),

    async create() {
      await this.createGoal({
        goalForm: this.goal,
        user: this.$store.state.auth.authUser,
      });
      this.$emit('close');
    },

    async update() {
      await this.updateGoalForm(this.goal);
    },

    async cancel() {
      if (this.goalFormCreated) {
        await this.deleteGoalForm(this.goal['.key']);
      }
      this.$emit('close');
    },

    updateGoalAction(action) {
      this.goal.action = action;
      this.debouncedUpdate();
    },

    isFocused(name) {
      return this.focused === name;
    },

    debouncedUpdate: debounce(function() {
      this.update();
    }, 1500),
  },

  mounted() {
    document.onkeydown = event => {
      const ESC = 27;
      event = event || window.event;
      if (event.keyCode === ESC) {
        this.$emit('close');
      }
    };
  },

  async created() {
    const userId = this.$store.state.auth.authId;
    await this.fetchGoalForm(userId);
    if (this.$store.state.goals.goalForm) {
      this.goal = cloneDeep(this.$store.state.goals.goalForm);
    } else {
      this.goal.userId = userId;
      this.goal;
    }
    this.asyncDataStatus_fetched();
  },
};
</script>

<style lang="scss">
.overlay {
  padding: 1em;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f6f9fc;
  z-index: 60;

  &__inner {
    position: relative;
    max-width: 32em;
    margin-right: auto;
    margin-left: auto;
    padding: 1em;
  }
}

.input-cool {
  padding: 0 0.75em;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 7px 25px 0;
  transition: all 300ms cubic-bezier(0, 0.09, 0.33, 0.97);

  .textarea {
    padding: 0.5em 0;
    background-color: transparent;
    resize: none;
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  &:hover {
    box-shadow: 0px 4px 8px rgba(132, 156, 195, 0.8);
  }

  &.is-focused {
    box-shadow: 0px 4px 8px rgba(132, 156, 195, 0.8);
    background-color: #849cc3;
    color: #faf8ff;
  }
}

.escape-button {
  transition: all 100ms cubic-bezier(0, 0.09, 0.33, 0.97);
  margin: 0.5em;
  padding: 0.25em 0.75em;
  color: #faf8ff;
  border-radius: 6px;
  background-color: #8cc1c9;

  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.15);

  &:hover {
    background-color: #ad7ba3;
    color: #faf8ff;
  }
}

.form-button {
  transition: all 100ms cubic-bezier(0, 0.09, 0.33, 0.97);
  margin: 0.5em;
  padding: 0.25em 0.75em;
  color: #faf8ff;
  border-radius: 6px;
  background-color: #8cc1c9;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.15);

  &--submit {
    @extend .form-button;
    background-color: #8cc1c9;

    &:hover {
      // background-color: #8cc1c9;
      color: #faf8ff;
    }
  }

  &--cancel {
    @extend .form-button;
    background-color: #ad7ba3;

    &:hover {
      background-color: #ad7ba3;
      color: #faf8ff;
    }
  }
}
</style>
