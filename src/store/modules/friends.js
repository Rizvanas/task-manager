import { firestoreAction } from 'vuexfire';
import { usersRef } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: [],
  },

  actions: {
    bindToUserFriends: firestoreAction(({ bindFirestoreRef }, userId) => {
      return bindFirestoreRef(
        'items',
        usersRef.doc(userId).collection('friends'),
      );
    }),

    unbindUserFriends: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('items');
    }),
  },
};
