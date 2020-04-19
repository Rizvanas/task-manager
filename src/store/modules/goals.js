import { goalsRef } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    async fetchGoal({ dispatch }, goalId) {
      const goal = await goalsRef.doc(goalId).get();

      return await dispatch(
        'setItem',
        {
          resource: 'goals',
          item: goal.data(),
          id: goal.id,
        },
        { root: true },
      );
    },

    async fetchUserGoals({ commit, rootState }) {
      let goals = await goalsRef
        .where('owner', '==', rootState.auth.authId || '')
        .get();

      goals.docs.forEach(goal => {
        commit(
          'setItem',
          {
            resource: 'goals',
            item: goal.data(),
            id: goal.id,
          },
          { root: true },
        );
      });
    },
  },
};
