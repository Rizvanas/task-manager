import { firestoreAction } from 'vuexfire';
import { goalsRef, firestore } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: [],
    detail: {},
  },

  actions: {
    bindToGoals: firestoreAction(({ bindFirestoreRef }, authId) => {
      return bindFirestoreRef(
        'items',
        goalsRef.where('members', 'array-contains', authId).orderBy('priority'),
      );
    }),

    unbindGoals: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('items');
    }),

    bindToGoal: firestoreAction(({ bindFirestoreRef }, goalId) => {
      return bindFirestoreRef('detail', goalsRef.doc(goalId));
    }),

    unbindGoal: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('detail');
    }),

    async updateGoal(context, { id, updatedGoal }) {
      return goalsRef.doc(id).update({
        title: updatedGoal.title,
        description: updatedGoal.description,
        completionDate: updatedGoal.completionDate,
        members: updatedGoal.members,
        priority: updatedGoal.priority,
      });
    },

    async updateGoals({ commit }, goals) {
      const batch = firestore.batch();

      commit('setGoals', goals);

      goals.forEach(goal =>
        batch.update(goalsRef.doc(goal.id), {
          title: goal.title,
          description: goal.description,
          completionDate: goal.completionDate,
          members: goal.members,
          priority: goal.priority,
        }),
      );

      return batch.commit();
    },
  },

  mutations: {
    setGoals(state, goals) {
      state.items = [...goals];
    },
  },
};
