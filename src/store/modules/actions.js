import { firestoreAction } from 'vuexfire';
import { actionsRef, firestore } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: [],
  },

  actions: {
    bindToGoalActions: firestoreAction(({ bindFirestoreRef }, goalId) => {
      return bindFirestoreRef('items', actionsRef(goalId));
    }),

    unbindGoalActions: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('items');
    }),

    async createAction(
      { rootState },
      { goalId, title, assignedUserId, timeExpected },
    ) {
      const action = {
        title,
        assignedUserId,
        timeExpected,
        isActive: false,
        isFinished: false,
        timeTaken: 0,
        creator: rootState.auth.authId,
      };

      return actionsRef(goalId).add(action);
    },

    async updateAction(context, { goalId, id, updatedAction }) {
      return actionsRef(goalId)
        .doc(id)
        .update({
          title: updatedAction.title,
          timeExpected: updatedAction.timeExpected,
          assignedUserId: updatedAction.assignedUserId,
          isActive: updatedAction.isActive,
          isFinished: updatedAction.isFinished,
        });
    },

    async updateActionList(context, { goalId, updates, deletes }) {
      const batch = firestore.batch();

      updates.forEach(action =>
        batch.update(actionsRef(goalId).doc(action.id), {
          title: action.title,
          timeExpected: action.timeExpected,
          assignedUserId: action.assignedUserId,
          isActive: action.isActive,
          isFinished: action.isFinished,
        }),
      );

      deletes.forEach(id => batch.delete(actionsRef(goalId).doc(id)));

      return batch.commit();
    },
  },
};
