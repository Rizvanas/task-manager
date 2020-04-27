import { goalsRef } from '@/shared/firebase';
import { appendChildToParent } from '@/store/helpers';

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    async fetchGoal({ commit, state }, goalId) {
      const goalDoc = await goalsRef.doc(goalId).get();
      const goal = {
        ...goalDoc.data(),
        completionDate: goalDoc.data().completionDate.toDate(),
      };
      commit(
        'setItem',
        {
          resource: 'goals',
          item: goal,
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

    appendActionToGoal: appendChildToParent('actions'),
  },
};
