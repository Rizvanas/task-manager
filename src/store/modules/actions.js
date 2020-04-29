import { actionsRef, firestore } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    async fetchGoalActions({ commit }, goalId) {
      const querySnap = await actionsRef(goalId).get();
      querySnap.docs.forEach(actionDoc => {
        const action = {
          ...actionDoc.data(),
          goalId: actionDoc.ref.parent.parent.id,
          lastActivationTime: actionDoc.data().lastActivationTime
            ? actionDoc.data().lastActivationTime.toDate()
            : null,
        };

        commit(
          'setItem',
          {
            resource: 'actions',
            item: action,
            id: actionDoc.id,
          },
          { root: true },
        );
      });
      return;
    },

    async createAction(
      { commit, rootState, state },
      { title, assignedUserId, timeExpected, goalId },
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
      const actionRef = await actionsRef(goalId).add(action);
      commit(
        'setItem',
        {
          resource: 'actions',
          item: { ...action, goalId },
          id: actionRef.id,
        },
        { root: true },
      );

      return state.items[actionRef.id];
    },

    async updateAction({ commit }, { goalId, id, updatedAction }) {
      await actionsRef(goalId)
        .doc(id)
        .update({
          title: updatedAction.title,
          timeExpected: updatedAction.timeExpected,
          assignedUserId: updatedAction.assignedUserId,
          isActive: updatedAction.isActive,
          isFinished: updatedAction.isFinished,
        });

      commit(
        'setItem',
        { resource: 'actions', id, item: updatedAction },
        { root: true },
      );
    },

    async updateActionList({ commit }, { goalId, updates, deletes }) {
      const batch = firestore.batch();

      updates.forEach(action =>
        batch.update(actionsRef(goalId).doc(action['.key']), {
          title: action.title,
          timeExpected: action.timeExpected,
          assignedUserId: action.assignedUserId,
          isActive: action.isActive,
          isFinished: action.isFinished,
        }),
      );

      deletes.forEach(id => batch.delete(actionsRef(goalId).doc(id)));
      await batch.commit();

      updates.forEach(action =>
        commit(
          'setItem',
          { resource: 'actions', id: action['.key'], item: action },
          { root: true },
        ),
      );

      deletes.forEach(id =>
        commit('deleteItem', { resource: 'actions', id }, { root: true }),
      );
    },
  },
};
