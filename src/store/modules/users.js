import Vue from 'vue';
import { firestoreAction } from 'vuexfire';
import { usersRef, docId } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    items: [],
    nonFriends: [],
  },

  getters: {
    getUsers: state => ids => {
      return ids.map(id => state.items[id]);
    },
  },

  actions: {
    bindToGoalUsers: firestoreAction(({ bindFirestoreRef }, ids) => {
      return bindFirestoreRef('items', usersRef.where(docId, 'in', ids));
    }),

    unbindGoalUsers: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('items');
    }),

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

    async fetchUsersByUsername({ commit }) {
      const querySnap = await usersRef.limit(50).get();
      commit(
        'setSearch',
        querySnap.docs.map(userDoc => {
          return {
            ...userDoc.data(),
            id: userDoc.id,
          };
        }),
      );
    },

    async fetchUsers({ commit }, ids) {
      const usersSnap = await usersRef
        .where(docId, 'in', ids)
        .limit(50)
        .get();

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

    async fetchNonFriendUsers({ commit, rootState }) {
      const usersSnap = await usersRef.limit(50).get();
      const authId = rootState.auth.authUser['.key'];
      const users = usersSnap.docs.filter(user => user.id !== authId);
      const friends = rootState.friends.items;

      friends.forEach(friend => {
        const userIndex = users.findIndex(user => user.id === friend.userId);
        if (userIndex >= 0) {
          users.splice(userIndex, 1);
        }
      });

      commit('setUsers', {
        resource: 'nonFriends',
        users: users.map(user => {
          return { ...user.data(), id: user.id };
        }),
      });
    },
  },

  mutations: {
    setUsers(state, { resource, users }) {
      users.forEach(user => {
        Vue.set(state[resource], user.id, user);
      });
    },
  },
};
