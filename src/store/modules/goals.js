import { firestoreAction } from 'vuexfire';
import {
  goalsRef,
  goalFormsRef,
  goalStatsRef,
  firestore,
  timeStamp,
  serverTimestamp,
} from '@/shared/firebase';
import { format, parse, addDays } from 'date-fns';
import { displayDateFormat } from '@/shared/constants';
import { cloneDeep } from 'lodash';

export default {
  namespaced: true,

  state: {
    items: [],
    detail: {},
    stats: {},
    goalForm: null,
  },

  getters: {
    stats(state) {
      const orderedStats = {};
      Object.keys(state.stats)
        .sort(function(a, b) {
          return new Date(a) - new Date(b);
        })
        .forEach(function(key) {
          orderedStats[key] = state.stats[key];
        });

      return orderedStats;
    },
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

    bindToGoalStat: firestoreAction(({ bindFirestoreRef }, goalId) => {
      return bindFirestoreRef('stats', goalStatsRef.doc(goalId));
    }),

    unbindGoalStat: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('stats');
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

    async updateGoalForm({ commit }, goalForm) {
      goalForm.completionDate = goalForm.completionDate || new Date();
      const goal = {
        title: goalForm.title,
        description: goalForm.description,
        completionDate: timeStamp.fromDate(
          parse(goalForm.completionDate, displayDateFormat, new Date()),
        ),
        action: goalForm.action ? goalForm.action : null,
        userId: goalForm.userId,
      };

      if (goalForm['.key']) {
        await goalFormsRef.doc(goalForm['.key']).set(goal);
        commit('setGoalForm', { goalForm: goalForm, id: goalForm['.key'] });
      } else {
        const goalDoc = await goalFormsRef.add(goal);
        commit('setGoalForm', { goalForm: goalForm, id: goalDoc.id });
      }
    },

    async createGoal({ dispatch }, { goalForm, user }) {
      const goal = await goalsRef.add({
        title: goalForm.title,
        description: goalForm.description,
        completionDate: timeStamp.fromDate(
          parse(goalForm.completionDate, displayDateFormat, new Date()),
        ),
        createdAt: serverTimestamp,
        owner: user['.key'],
        ownerName: user.username,
        ownerAvatar: user.avatar,
        members: [user['.key']],
        actionsFinished: 0,
        totalActions: 0,
        timeRequired: 0,
        timeFinished: 0,
        priority: 0,
      });
      goalForm.action.goalId = goal.id;
      await dispatch('actions/createAction', goalForm.action, { root: true });
      await dispatch('createGoalStat', goal.id);
      return dispatch('deleteGoalForm', goalForm['.key']);
    },

    async deleteGoalForm({ commit }, goalFormId) {
      await goalFormsRef.doc(goalFormId).delete();
      commit('setGoalForm', { goalForm: null, id: null });
    },

    async fetchGoalForm({ commit }, userId) {
      const goalSnap = await goalFormsRef
        .where('userId', '==', userId)
        .limit(1)
        .get();
      if (!goalSnap.empty) {
        const goalId = goalSnap.docs[0].id;
        const goalDoc = goalSnap.docs[0].data();

        goalDoc.completionDate = format(
          goalDoc.completionDate.toDate(),
          displayDateFormat,
        );

        commit('setGoalForm', {
          goalForm: goalDoc,
          id: goalId,
        });
      }
    },

    async createGoalStat(context, goalId) {
      const today = new Date();
      const stats = [0, 1, 2, 3, 4, 5, 6].reduce(
        (o, key) => ({
          ...o,
          [format(addDays(today, key), displayDateFormat)]: 0,
        }),
        {},
      );

      return goalStatsRef.doc(goalId).set(stats);
    },
  },

  mutations: {
    setGoals(state, goals) {
      state.items = [...goals];
    },

    setGoalForm(state, { goalForm, id = null }) {
      if (goalForm) {
        goalForm['.key'] = id;
        state.goalForm = cloneDeep(goalForm);
      } else {
        state.goalForm = goalForm;
      }
    },
  },
};
