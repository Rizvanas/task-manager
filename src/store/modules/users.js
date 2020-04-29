import { usersRef, docId } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: {},
  },

  getters: {
    getUsers: state => ids => {
      return ids.map(id => state.items[id]);
    },
  },

  actions: {
    createUser({ commit, state }, { id, email, username, avatar }) {
      return new Promise((resolve, reject) => {
        email = email.toLowerCase();
        const lowerUsername = username.toLowerCase();
        const user = {
          email,
          username,
          lowerUsername,
          avatar,
        };
        usersRef
          .doc(`${id}`)
          .set(user)
          .then(() => {
            commit(
              'setItem',
              { resource: 'users', id: id, item: user },
              { root: true },
            );
            resolve(state.items[id]);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    fetchUser({ dispatch }, id) {
      return dispatch(
        'fetchItem',
        { resource: 'users', id: id },
        { root: true },
      );
    },

    async fetchUsersByUsername(context, username) {
      const querySnap = await usersRef
        .where('lowerUsername', '>=', username)
        .limit(50)
        .get();

      return querySnap.map(userDoc => {
        userDoc.data(), userDoc.id;
      });
    },

    async fetchUsers({ commit }, ids) {
      const usersSnap = await usersRef.where(docId, 'in', ids).get();

      usersSnap.docs.forEach(userDoc => {
        commit(
          'setItem',
          {
            resource: 'users',
            item: {
              ...userDoc.data(),
              id: userDoc.id,
            },
            id: userDoc.id,
          },
          { root: true },
        );
      });

      return;
    },
  },
};
