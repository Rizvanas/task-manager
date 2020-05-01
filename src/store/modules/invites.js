import { firestoreAction } from 'vuexfire';
import Vue from 'vue';
import {
  friendInvitesRef,
  usersRef,
  goalsRef,
  serverTimestamp,
} from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    sent: {},
    received: {},
    friend: {
      sent: {},
      received: {},
    },
    goal: {},
  },

  actions: {
    async sendFriendInvitationTo({ rootState, commit }, recipient) {
      const authUserId = rootState.auth.authId;
      const authUser = rootState.auth.authUser.items;

      const invite = {
        from: authUserId,
        fromUsername: authUser.username,
        fromAvatar: authUser.avatar,
        to: recipient.id,
        toUsername: recipient.username,
        toAvatar: recipient.avatar,
        sent: serverTimestamp,
      };

      const inviteRef = await friendInvitesRef.add(invite);
      const id = inviteRef.id;
      commit('setSentInvite', invite, id);
    },

    bindToReceivedFriendInvitations: firestoreAction(
      ({ bindFirestoreRef }, userId) => {
        return bindFirestoreRef(
          'friend.received',
          friendInvitesRef.where('to', '==', userId),
        );
      },
    ),

    unbindReceivedFriendInvitations: firestoreAction(
      ({ unbindFirestoreRef }) => {
        unbindFirestoreRef('friend.received');
      },
    ),

    async fetchReceivedInvitations({ commit }, userId) {
      const querySnap = await friendInvitesRef.where('to', '==', userId).get();

      querySnap.forEach(inviteDoc =>
        commit('setInvite', {
          invite: inviteDoc.data(),
          id: inviteDoc.id,
          resource: 'received',
        }),
      );
    },

    async acceptFriendInvite({ state }, inviteId) {
      const invite = state.received[inviteId];
      await usersRef
        .doc(invite.from)
        .collection('friends')
        .add({
          userId: invite.to,
          username: invite.toUsername,
          avatar: invite.toAvatar,
        });

      await usersRef
        .doc(invite.to)
        .collection('friends')
        .add({
          userId: invite.from,
          username: invite.fromUsername,
          avatar: invite.fromAvatar,
        });

      await friendInvitesRef.doc(inviteId).delete();
    },

    async fetchGoalInvitations({ commit }, { from, to }) {
      const goalsSnap = await goalsRef
        .where('owner', '==', from)
        .limit(50)
        .get();

      goalsSnap.docs.forEach(goal => {
        if (!goal.data().members.includes(to)) {
          commit('setInvite', {
            resource: 'goal',
            id: goal.id,
            invite: { title: goal.data().title, from, to },
          });
          commit(
            'setItem',
            { resource: 'goals', id: goal.id, item: goal.data() },
            { root: true },
          );
        }
      });
    },

    removeInvite({ commit }, { resource, id }) {
      commit('removeInvite', { resource, id });
    },
  },

  mutations: {
    setInvite(state, { invite, id, resource }) {
      invite['.key'] = id;
      Vue.set(state[resource], id, invite);
    },

    removeInvite(state, { resource, id }) {
      Vue.delete(state[resource], id);
    },
  },
};
