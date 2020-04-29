import { usersRef } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    async fetchUserFriends({ commit }, userId) {
      const snap = await usersRef
        .doc(userId)
        .collection('friends')
        .get();

      snap.docs.forEach(friend => {
        commit(
          'setItem',
          {
            resource: 'friends',
            item: friend.data(),
            id: friend.id,
          },
          { root: true },
        );
      });

      return;
    },
  },
};
