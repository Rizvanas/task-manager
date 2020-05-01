<template>
  <section v-if="asyncDataStatus_ready">
    <div class="hero">
      <div class="hero-body">
        <h1 class="title is-size-1 has-text-weight-bold">
          <span class="underline-primary">Goals</span>
        </h1>
      </div>
    </div>

    <!-- <AddGoalCard /> -->
    <draggable
      class="columns is-multiline"
      v-model="goals"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      tag="div"
    >
      <div
        v-for="goal in goals"
        :key="goal.priority"
        class="column is-12-tablet is-6-desktop is-4-widescreen"
      >
        <GoalCard :goal="goal" />
      </div>
    </draggable>
  </section>
</template>
<script>
import { mapActions } from 'vuex';
import asyncDataStatus from '@/mixins/asyncDataStatus';
import GoalCard from '@/components/goal-card.vue';
// import AddGoalCard from '@/components/add-goal-card.vue';
import draggable from 'vuedraggable';

export default {
  name: 'Goals',
  components: { GoalCard, draggable },

  data() {
    return {
      drag: false,
      addingNewCard: false,
      goalData: [],
    };
  },

  mixins: [asyncDataStatus],

  computed: {
    goals: {
      get() {
        return this.$store.state.goals.items.map(goal => {
          return { ...goal, id: goal.id };
        });
      },

      set(goals) {
        this.updateGoals(
          goals.map((goal, index) => {
            return { ...goal, priority: index };
          }),
        );
      },
    },

    authId() {
      return this.$store.state.auth.authId;
    },

    dragOptions() {
      return {
        animation: 150,
        swapTreshold: 1,
        group: 'description',
        disabed: false,
        ghostClass: 'ghost',
        sort: true,
      };
    },
  },

  methods: {
    ...mapActions('goals', [
      'fetchUserGoals',
      'bindToGoals',
      'unbindGoals',
      'updateGoals',
    ]),

    updatePriority() {},
  },

  async created() {
    await this.bindToGoals(this.$store.state.auth.authId);
    this.goalData = this.$store.state.goals.items.map(goal => {
      return { ...goal, id: goal.id };
    });
    this.asyncDataStatus_fetched();
  },

  beforeDestroy() {
    this.unbindGoals();
  },
};
</script>

<style scoped>
.no-move {
  opacity: 0.5s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
