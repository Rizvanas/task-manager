import { usersRef } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: {},
  },

  actions: {
    createUser({ commit, state }, { id, email, username, avatar }) {
      return new Promise((resolve, reject) => {
        email = email.toLowerCase();
        const lowerUsername = username.toLowerCase();
        const user = { email, username, lowerUsername, avatar };
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
  },
};
