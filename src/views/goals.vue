<template>
  <section class="section">
    <div class="hero">
      <div class="hero-body">
        <h1 class="title is-size-1 has-text-weight-bold">
          <span class="underline-primary">Goals</span>
          <span>
            <button class="button button-special is-rounded">
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
              <span>Set new goal</span>
            </button>
          </span>
        </h1>
      </div>
    </div>

    <AddGoalCard class="column is-12-tablet is-6-desktop is-4-widescreen" />
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
        :key="goal.order"
        class="column is-12-tablet is-6-desktop is-4-widescreen"
      >
        <GoalCard :goal="goal" />
      </div>
    </draggable>
  </section>
</template>
<script>
import GoalCard from '@/components/goal-card.vue';
import AddGoalCard from '@/components/add-goal-card.vue';
import draggable from 'vuedraggable';

const goals = [
  { id: 1, title: 'Mano tikslas' },
  { id: 2, title: 'Mano tikslas su ilgu pavadinimu' },
  { id: 3, title: 'Mano tikslas su labai, labai iilgu pavadinimu' },
  { id: 4, title: 'Mano didingas tikslas' },
  { id: 5, title: 'Mano gyvenimo tikslas' },
  { id: 6, title: 'My tikslas' },
];

export default {
  name: 'Goals',
  components: { GoalCard, AddGoalCard, draggable },

  data() {
    return {
      goals: goals.map((goal, index) => {
        return { ...goal, order: index + 1 };
      }),
      drag: false,
      addingNewCard: false,
    };
  },
  methods: {
    sort() {
      this.goals = this.goals.sort((a, b) => a.order - b.order);
    },
  },
  computed: {
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
