import Vue from 'vue';
import { friendInvitesRef, usersRef, serverTimestamp } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    sent: {},
    received: {},
  },

  actions: {
    async sendFriendInvitationTo({ rootState, commit, dispatch }, userId) {
      const authUserId = rootState.auth.authId;
      const authUser = rootState.users.items[authUserId];
      const receiver = await dispatch('fetchUser', userId);

      const invite = {
        from: authUserId,
        fromUsername: authUser.username,
        fromAvatar: authUser.avatar,
        to: userId,
        toUsername: receiver.username,
        toAvatar: receiver.avatar,
        sent: serverTimestamp,
      };

      const inviteRef = await friendInvitesRef.add(invite);
      const id = inviteRef.id;
      commit('setSentInvite', invite, id);
    },

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
  },

  mutations: {
    setInvite(state, { invite, id, resource }) {
      invite['.key'] = id;
      Vue.set(state[resource], id, invite);
    },
  },
};
