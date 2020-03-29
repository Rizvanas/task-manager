<template>
  <section class="section">
    <div class="hero">
      <div class="hero-body">
        <h1 class="title is-size-1 has-text-centered has-text-weight-bold">
          <span class="underline-primary">Goals</span>
        </h1>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        v-for="goal in goals"
        :key="goal.id"
        class="column is-12-tablet is-6-desktop is-4-widescreen"
      >
        <GoalCard :goal="goal" />
      </div>
    </div>
  </section>
</template>
<script>
import GoalCard from '@/components/goal-card.vue';

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
  data() {
    return {
      goals,
    };
  },
  computed: {},
  components: { GoalCard },
};
</script>
