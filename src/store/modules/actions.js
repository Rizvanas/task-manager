import { actionsRef } from '@/shared/firebase';

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
          lastActivationTime: actionDoc.data().lastActivationTime.toDate(),
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

    //   async updateAction(
    //     context,
    //     goalId,
    //     {
    //       title,
    //       actualWorkHours,
    //       expectedWorkHours,
    //       isActive,
    //       isFinished,
    //       assignedUserId,
    //       lastActivationTime,
    //     },
    //   ) {
    //     console.log(
    //       goalId,
    //       title,
    //       actualWorkHours,
    //       expectedWorkHours,
    //       isActive,
    //       isFinished,
    //       assignedUserId,
    //       lastActivationTime,
    //     );
    //   },
  },
};
