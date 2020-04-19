import { auth, googleAuthProvider, usersRef } from '@/shared/firebase';

export default {
  namespaced: true,

  state: {
    authId: null,
    unsubAuthObserver: null,
  },

  getters: {
    authUser(state, getters, rootState) {
      return state.authId ? rootState.users.items[state.authId] : null;
    },
  },

  mutations: {
    setAuthId(state, id) {
      state.authId = id;
    },

    setUnsubAuthObserver(state, unsub) {
      state.unsubAuthObserver = unsub;
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
            username: user.email,
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
