import { goalsRef } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    async fetchGoal({ commit, state }, goalId) {
      const goalDoc = await goalsRef.doc(goalId).get();
      commit(
        'setItem',
        {
          resource: 'goals',
          item: goalDoc.data(),
          id: goalDoc.id,
        },
        { root: true },
      );

      return state.items[goalId];
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

    async updateGoal({ commit }, { id, updatedGoal }) {
      await goalsRef.doc(id).update({
        title: updatedGoal.title,
        description: updatedGoal.description,
        completionDate: updatedGoal.completionDate,
      });

      commit(
        'setItem',
        {
          resource: 'goals',
          item: updatedGoal,
          id,
        },
        { root: true },
      );
    },
  },
};
