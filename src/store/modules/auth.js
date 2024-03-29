import { auth, googleAuthProvider, usersRef } from '@/shared/firebase';
import getRandomColor from '@/shared/colorHelpers';

export default {
  namespaced: true,

  state: {
    authId: null,
    unsubAuthObserver: null,
    authUser: null,
  },

  getters: {
    authUser(state, getters, rootState) {
      return state.authId
        ? rootState.users.items.find(user => user.id === state.authId)
        : null;
    },
  },

  mutations: {
    setAuthId(state, id) {
      state.authId = id;
    },

    setUnsubAuthObserver(state, unsub) {
      state.unsubAuthObserver = unsub;
    },

    setAuthUser(state, user) {
      state.authUser = user;
    },
  },

  actions: {
    initAuthentication({ dispatch, commit, state }) {
      return new Promise(resolve => {
        if (state.unsubAuthObserver) {
          state.unsubAuthObserver();
        }

        const unsub = auth.onAuthStateChanged(user => {
          if (user) {
            dispatch('fetchAuthUser').then(dbUser => resolve(dbUser));
          } else {
            resolve(null);
          }
        });
        commit('setUnsubAuthObserver', unsub);
      });
    },

    signUpWithEmailAndPassword(
      { dispatch },
      { email, password, username, avatar = null },
    ) {
      const firstLetter = username.charAt(0);
      const bgColor = getRandomColor();
      const textColor = getRandomColor();
      avatar = `https://via.placeholder.com/512/${bgColor}/${textColor}/?text=${firstLetter}`;
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCreds => {
          return dispatch(
            'users/createUser',
            {
              id: userCreds.user.uid,
              email,
              username,
              avatar,
            },
            { root: true },
          );
        })
        .then(() => dispatch('fetchAuthUser'));
    },

    async signInWithEmailAndPassword(context, { email, password }) {
      const user = await auth.signInWithEmailAndPassword(email, password);
      return user;
    },

    async signInWithGoogle({ dispatch }) {
      const userData = await auth.signInWithPopup(googleAuthProvider);
      let user = userData.user;
      const userDoc = await usersRef.doc(user.uid).get();
      if (!userDoc.exists) {
        await dispatch(
          'users/createUser',
          {
            id: user.uid,
            email: user.email,
            username: user.displayName.replace(/ .*/, ''),
            avatar: user.photoURL,
          },
          { root: true },
        );
      }

      return user;
    },

    async signOut({ commit }) {
      await auth.signOut();
      commit('setAuthId', null);
      commit('setAuthUser', null);
    },

    fetchAuthUser({ dispatch, commit }) {
      const userId = auth.currentUser.uid;
      return new Promise(resolve => {
        usersRef
          .doc(userId)
          .get()
          .then(userDoc => {
            if (userDoc.exists) {
              return dispatch('users/fetchUser', userId, { root: true }).then(
                user => {
                  commit('setAuthId', userId);
                  commit('setAuthUser', user);
                  resolve(user);
                },
              );
            } else {
              resolve(null);
            }
          });
      });
    },
  },
};
